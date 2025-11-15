# 🚀 Ejecución de Scraping vía API

Guía para ejecutar manualmente el scraping de datos de polen usando la ruta API.

## 📋 Resumen

En lugar de usar Vercel Cron (no disponible en tu plan), puedes usar la ruta API `/api/scrape` para ejecutar el scraping cuando lo necesites usando:
- Postman
- cURL
- Tu propia tarea programada (en tu servidor)
- Herramientas de automatización externas

## 🔗 Ruta API Disponible

**Endpoint:** `POST /api/scrape`

### En Desarrollo

```bash
curl -X POST http://localhost:4321/api/scrape
```

### En Producción (Vercel)

```bash
curl -X POST https://tu-proyecto.vercel.app/api/scrape
```

## 📊 Ejemplos de Uso

### 1. Con cURL

```bash
# Ejecución simple
curl -X POST https://tu-proyecto.vercel.app/api/scrape

# Con headers
curl -X POST https://tu-proyecto.vercel.app/api/scrape \
  -H "Content-Type: application/json"
```

### 2. Con Postman

1. Abrir Postman
2. Crear nueva request
3. Método: **POST**
4. URL: `https://tu-proyecto.vercel.app/api/scrape`
5. Click en **Send**

**Respuesta exitosa:**
```json
{
  "success": true,
  "message": "Scraping completado exitosamente",
  "data": {
    "city": "Santiago",
    "date": "jueves, 6 de noviembre de 2025 al miércoles, 12 de noviembre de 2025",
    "levels": [
      { "type": "total de árboles", "level": "MEDIOS", "concentration": 80 },
      { "type": "plátano oriental", "level": "MEDIOS", "concentration": 11 },
      { "type": "pastos", "level": "MEDIOS", "concentration": 26 },
      { "type": "malezas", "level": "BAJOS", "concentration": 9 }
    ],
    "forecast": "Comentarios: ... | Pronóstico: ... | Recomendaciones: ..."
  },
  "timestamp": "2025-11-15T02:00:00.000Z"
}
```

### 3. Con JavaScript/Fetch

```javascript
// Fetch simple
fetch('https://tu-proyecto.vercel.app/api/scrape', {
  method: 'POST'
})
  .then(res => res.json())
  .then(data => console.log(data));

// Con async/await
async function executeScrap() {
  try {
    const response = await fetch('https://tu-proyecto.vercel.app/api/scrape', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.json();
    console.log('Scraping completado:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}
```

### 4. Con Python

```python
import requests

url = 'https://tu-proyecto.vercel.app/api/scrape'
response = requests.post(url)
data = response.json()
print(data)
```

## 🤖 Automatización Sin Vercel Cron

### Opción 1: Cron en tu Servidor

Si tienes un servidor propio:

```bash
# Editar crontab
crontab -e

# Agregar línea (ejecutar cada 6 horas)
0 */6 * * * curl -X POST https://tu-proyecto.vercel.app/api/scrape
```

### Opción 2: GitHub Actions

Crea `.github/workflows/scrape-pollen.yml`:

```yaml
name: Scraping de Polen
on:
  schedule:
    - cron: '0 */6 * * *'

jobs:
  scrape:
    runs-on: ubuntu-latest
    steps:
      - name: Ejecutar scraping
        run: |
          curl -X POST https://tu-proyecto.vercel.app/api/scrape
```

### Opción 3: Servicio Externo

Usar servicios como:
- **EasyCron** (easycron.com)
- **IFTTT** (ifttt.com)
- **Zapier** (zapier.com)
- **Make/Integromat** (make.com)

Todos permiten ejecutar webhooks POST periódicamente.

## 📝 Alternativa Local

### Ejecutar Manualmente en tu PC

```bash
npm run scrape:save
```

Este comando:
1. Ejecuta el scraping
2. Guarda en Supabase
3. Genera notificación
4. Muestra logs en consola

## 🔍 Respuestas de API

### ✅ Exitosa (200)

```json
{
  "success": true,
  "message": "Scraping completado exitosamente",
  "data": { ... },
  "timestamp": "2025-11-15T02:00:00.000Z"
}
```

### ❌ Error (500)

```json
{
  "success": false,
  "message": "Error al ejecutar el scraping",
  "error": "Error desconocido",
  "data": null
}
```

## 📋 Resumen de Opciones

| Opción | Ventajas | Desventajas |
|--------|----------|------------|
| **Postman Manual** | Simple, sin setup | Manual |
| **cURL Script** | Automatizable | Requiere servidor |
| **GitHub Actions** | Gratuito, confiable | Config YAML |
| **EasyCron** | Muy simple | Requiere cuenta |
| **Servidor Propio** | Total control | Costo servidor |
| **npm run scrape:save** | Directo, completo | Local only |

## 🔗 Documentación Relacionada

- [SCRAPING_MANUAL.md](./SCRAPING_MANUAL.md) - Manual de scraping completo
- [API_ENDPOINTS.md](./API_ENDPOINTS.md) - Todos los endpoints disponibles
- [CRON_SETUP.md](./CRON_SETUP.md) - Otras opciones de automatización

---

**Última actualización:** 15 de noviembre de 2025

**Estado:** ✅ Usando ruta API manual (sin Vercel Cron)
