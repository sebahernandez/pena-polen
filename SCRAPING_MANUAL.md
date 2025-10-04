# Scraping Manual de Datos de Polen

## Resumen

Este documento explica cómo ejecutar manualmente el scraping de datos de polen desde polenes.cl para actualizar la base de datos.

## Estado Actual del Sistema

- ❌ **No hay automatización configurada** - El scraping debe ejecutarse manualmente
- 🔄 **Scraping funcional** - Los datos se extraen correctamente de polenes.cl
- ⚠️ **Supabase no configurado** - Los datos no se guardan en la base de datos

## Comandos para Ejecutar Scraping

### 1. Scraping completo con guardado en Supabase
```bash
npx tsx src/lib/polenes.ts
```

### 2. Solo scraping (sin guardar)
Ejecutar la función `runPollenScraping()` programáticamente.

## Datos Obtenidos en la Última Ejecución

**Fecha:** jueves, 25 de septiembre de 2025 al miércoles, 1 de octubre de 2025
**Ciudad:** Santiago

### Niveles de Polen:
1. **Total de árboles:** ALTOS (447 g/m³)
2. **Plátano oriental:** ALTOS (252 g/m³) 
3. **Pastos:** BAJOS (6 g/m³)
4. **Malezas:** MEDIOS (30 g/m³)

### Pronóstico:
- **Comentarios:** Niveles ALTOS. Los principales pólenes detectados fueron los de plátano oriental, morera y arce.
- **Predicción:** Niveles ALTOS. Los principales pólenes detectados serán los de plátano oriental, morera y nogal. Los pólenes de pastos empezarán a aumentar paulatinamente.
- **Recomendaciones:** Mantenga las ventanas cerradas, evite tenderse en el pasto, use anteojos de sol y mascarilla si es necesario.

## Configuración Requerida

### Variables de Entorno para Supabase
Para que los datos se guarden automáticamente, configurar:

```env
PUBLIC_SUPABASE_URL=tu_url_de_supabase
PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase
```

## Opciones de Automatización

### 1. Vercel Cron Functions
Crear `/api/cron/scrape-pollen.ts`:
```typescript
import { scrapeAndSavePollenData } from '../../src/lib/polenes';

export default async function handler() {
  await scrapeAndSavePollenData();
  return { status: 'success' };
}
```

Configurar en `vercel.json`:
```json
{
  "crons": [{
    "path": "/api/cron/scrape-pollen",
    "schedule": "0 */6 * * *"
  }]
}
```

### 2. GitHub Actions
Crear `.github/workflows/scrape-pollen.yml`:
```yaml
name: Scrape Pollen Data
on:
  schedule:
    - cron: '0 */6 * * *'
jobs:
  scrape:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npx tsx src/lib/polenes.ts
```

### 3. Cron Job en Servidor
```bash
# Editar crontab
crontab -e

# Agregar línea para ejecutar cada 6 horas
0 */6 * * * cd /ruta/proyecto && npx tsx src/lib/polenes.ts
```

## Funciones Disponibles

### `scrapeAndSavePollenData()`
- Ejecuta scraping completo
- Guarda datos en Supabase (si está configurado)
- Muestra información en consola
- **Ubicación:** `src/lib/polenes.ts:304`

### `runPollenScraping()`
- Solo ejecuta scraping
- No guarda en base de datos
- **Ubicación:** `src/lib/polenes.ts:293`

## API de Consulta

Una vez guardados los datos, consultar a través de:
- `GET /api/penaflor?action=latest` - Último registro
- `GET /api/penaflor?action=current` - Registro actual
- `GET /api/penaflor?action=status` - Estado del sistema

## Recomendaciones

1. **Configurar Supabase** para persistencia de datos
2. **Implementar automatización** usando una de las opciones sugeridas
3. **Ejecutar scraping cada 6-12 horas** durante temporada de polen
4. **Monitorear logs** para detectar fallos en el scraping
5. **Configurar alertas** para cuando el scraping falle

## Troubleshooting

- **Sin conexión a Supabase:** Verificar variables de entorno
- **Error de scraping:** Verificar que polenes.cl esté accesible
- **Datos vacíos:** El sitio web puede haber cambiado su estructura