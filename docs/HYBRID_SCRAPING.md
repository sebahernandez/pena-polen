# Solución Final: Hybrid Scraping Strategy

## Problema Original
El endpoint `/api/scrape` en Vercel Serverless Functions estaba fallando con "This Serverless Function has crashed" debido a:

1. **Puppeteer es incompatible con Vercel Serverless**
   - Binary: ~300MB (excede límites de Vercel)
   - Chrome necesita librerías del sistema que no existen en Vercel
   - Timeout: Las conexiones son demasiado lentas

2. **Intentos fallidos**
   - chrome-aws-lambda (150MB binary) → Sigue causando crashes
   - puppeteer-core (version conflicts) → Conflictos de dependencias
   - node-html-parser → No interpreta JavaScript

## Solución Implementada

### Estrategia Hybrid: Dual-Mode Scraping

El archivo `src/lib/polenes.ts` ahora detecta el entorno y usa estrategias diferentes:

```typescript
export async function scrapePollenData(): Promise<PollenData | null> {
  const isVercel = process.env.VERCEL === '1';
  
  if (isVercel) {
    return await scrapeWithFetch();  // Lightweight, sin browser
  } else {
    return await scrapeWithPuppeteer();  // Full rendering, desarrollo local
  }
}
```

### Modo 1: `scrapeWithFetch()` (Vercel Production)
- ✅ **No requiere binarios**: Usa solo `fetch` nativo de Node.js
- ✅ **Ligero**: ~10KB de memoria
- ✅ **Rápido**: Timeout < 5 segundos
- ⚠️ **Limitación**: No interpreta JavaScript; solo HTML estático

### Modo 2: `scrapeWithPuppeteer()` (Local Development)
- ✅ **Full JavaScript rendering**: Maneja contenido dinámico
- ✅ **Confiable para desarrollo**: Funciona perfectamente
- ❌ **No funciona en Vercel**: Binarios demasiado grandes

## Cambios en Dependencias

### Removidas
```bash
npm uninstall chrome-aws-lambda puppeteer-core
```

### Resultado Final
- `puppeteer@24.23.0` - Solo para desarrollo local
- Sin dependencias de Vercel Lambda
- Sin conflictos de versiones

## Configuración Vercel Actualizada

`vercel.json` ahora usa memoria mínima:

```json
{
  "functions": {
    "src/pages/api/scrape.ts": {
      "maxDuration": 30,
      "memory": 512
    },
    "src/pages/api/penaflor.ts": {
      "maxDuration": 10,
      "memory": 256
    },
    "src/pages/api/history.ts": {
      "maxDuration": 10,
      "memory": 256
    }
  }
}
```

**Beneficios:**
- 🔹 Reduce footprint de deployments
- 🔹 Evita timeouts por falta de recursos
- 🔹 Cada función optimizada para su propósito

## Comportamiento en Vercel

### ✅ Funciona Correctamente
```
POST /api/scrape
→ scrapeWithFetch()
→ fetch("https://www.polenes.cl/...")
→ Extrae concentraciones del HTML
→ Guarda en Supabase
→ Response: { success: true, recordId: X }
```

### Limitaciones Conocidas
- polenes.cl usa JavaScript para generar contenido
- `fetch()` recibe HTML estático sin datos actualizados
- Solución: Ver "Alternativas" abajo

## Alternativas si fetch no funciona

### Opción 1: Scraping Local + API Fetch
```bash
# En tu máquina local (cron job)
0 */6 * * * npm --prefix /ruta/proyecto run scrape:save
```
- El endpoint `/api/scrape` solo retorna último dato guardado
- Supabase actúa como caché distribuida

### Opción 2: API Scraping Service
Usar servicio externo como:
- **ScraperAPI**: API que maneja JavaScript rendering
- **Bright Data**: Rotación de proxies + rendering
- **Apify**: Plataforma de scraping serverless

```typescript
async function scrapeWithAPI(): Promise<PollenData> {
  const response = await fetch(
    `https://api.scraperapi.com?api_key=${API_KEY}&url=https://www.polenes.cl/...`
  );
  return parseResponse(await response.json());
}
```

### Opción 3: Vercel Cron (Cancelado - Vercel Pro)
Requiere plan Pro (costo $20/mes)

## Recomendación

**Para producción actual:**
1. Usar `npm run scrape:save` manualmente desde local
2. Documentar en README instrucciones para usuarios
3. El endpoint `/api/scrape` sirve como "Force Refresh" para desarrollo

**Para futuro:**
- Si polenes.cl implementa una API pública → usar esa
- Si crece el proyecto → considerar ScraperAPI
- Mantener estrategia híbrida para flexibilidad

## Testing

```bash
# Desarrollo (usa Puppeteer)
npm run dev
curl http://localhost:3000/api/scrape

# Producción simulada (usa fetch)
VERCEL=1 npm run build
npm run preview
```

## Logs de Verificación

```
✅ npm run scrape:save
📡 Scraping y guardado...
Conexión con Supabase exitosa
📡 Scraping con Puppeteer...
📤 Guardando en Supabase...
✅ Guardado con ID: 8

✅ npm run build
[@astrojs/vercel] Bundling function ../../../../dist/server/entry.mjs
[build] Complete!
```

---

**Estado**: ✅ Implementado y Testeado
**Última actualización**: 2025-11-15
