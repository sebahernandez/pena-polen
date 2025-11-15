# 🚀 Vercel Cron Deployment

Guía para configurar y desplegar el cron job de scraping automático en Vercel.

## 📋 Resumen

El proyecto ahora está configurado para ejecutar automáticamente el scraping de datos de polen cada 6 horas en Vercel usando Cron Jobs.

## 📁 Archivos Creados

### 1. `/src/pages/api/cron/scrape-pollen.ts`
Endpoint específico para Vercel Cron que:
- Se ejecuta automáticamente según el schedule
- Realiza el scraping de datos
- Guarda en Supabase
- Registra logs detallados
- Retorna respuesta JSON

### 2. `/vercel.json`
Configuración de Vercel con:
- Path del cron endpoint
- Schedule (cada 6 horas)
- Puede modificarse según necesidad

## 🔧 Configuración del Schedule

El archivo `vercel.json` controla cuándo se ejecuta el scraping:

```json
{
  "crons": [
    {
      "path": "/api/cron/scrape-pollen",
      "schedule": "0 */6 * * *"
    }
  ]
}
```

### Ejemplos de Schedules (Crontab Format)

| Schedule | Descripción |
|----------|------------|
| `0 */6 * * *` | Cada 6 horas |
| `0 */12 * * *` | Cada 12 horas |
| `0 9 * * *` | Diariamente a las 9 AM UTC |
| `0 0 * * *` | Diariamente a las 12 AM UTC (medianoche) |
| `0 8,14,20 * * *` | A las 8 AM, 2 PM y 8 PM UTC |
| `0 */3 * * *` | Cada 3 horas |
| `0 0 * * 0` | Cada domingo a medianoche |
| `0 9 * * 1-5` | Lunes a viernes a las 9 AM UTC |

## 🚢 Deployment

### Paso 1: Verificar los archivos

```bash
# Verificar que los archivos existen
ls -la src/pages/api/cron/scrape-pollen.ts
cat vercel.json
```

### Paso 2: Commit y Push

```bash
git add .
git commit -m "feat: Agregar Vercel Cron Job para scraping automático"
git push origin main
```

### Paso 3: Deploy en Vercel

1. Conectar el repositorio a Vercel (si no está conectado)
2. Vercel detectará automáticamente el archivo `vercel.json`
3. Deploy automáticamente

### Paso 4: Verificar en Vercel Dashboard

1. Ir a [vercel.com/dashboard](https://vercel.com/dashboard)
2. Seleccionar el proyecto "pena-polen"
3. Ir a "Settings" → "Crons"
4. Verificar que aparece el cron job configurado

## 📊 Monitoreo

### Logs en Vercel

Puedes ver los logs de ejecución del cron en:
- Dashboard de Vercel → Proyecto → Functions → Logs
- O ejecutar: `vercel logs`

### Ejemplo de Log Exitoso

```
⏰ [CRON] Iniciando scraping automático de polen...
⏰ [CRON] Hora: 2025-11-15T08:00:00.000Z
Conexión con Supabase exitosa
Scraping completo...
✅ [CRON] Scraping completado exitosamente
✅ [CRON] Registros de polen: 4
```

## 🔍 Troubleshooting

### El cron no se ejecuta

1. **Verificar que `vercel.json` está en la raíz** del proyecto
2. **Verificar permisos** del archivo `scrape-pollen.ts`
3. **Chequear logs** en Vercel Dashboard
4. **Probar manualmente**: 
   ```bash
   curl -X POST https://tu-proyecto.vercel.app/api/cron/scrape-pollen
   ```

### Error de conexión a Supabase

- Verificar que `PUBLIC_SUPABASE_URL` y `PUBLIC_SUPABASE_ANON_KEY` están en Environment Variables de Vercel
- Ir a Settings → Environment Variables en Vercel
- Agregar las variables si faltan

### Scraping no obtiene datos

- Verificar que polenes.cl está accesible
- Revisar la estructura HTML de polenes.cl (puede haber cambiado)
- Ejecutar manualmente en desarrollo: `npm run scrape:save`

## 📝 Alternativa: Ejecución Manual

Si prefieres ejecutar el scraping manualmente sin automatización:

```bash
# Ejecutar scraping manualmente
npm run scrape:save

# O hacer request a la API
curl -X POST http://localhost:4321/api/scrape

# O en producción
curl -X POST https://tu-proyecto.vercel.app/api/scrape
```

## 🔗 Rutas API Disponibles

| Ruta | Método | Descripción |
|------|--------|------------|
| `/api/scrape` | POST | Scraping manual (cualquier momento) |
| `/api/cron/scrape-pollen` | POST | Scraping automático (Vercel solo) |
| `/api/penaflor` | GET | Obtener datos actuales |
| `/api/history` | GET | Obtener historial |

## 📚 Documentación Relacionada

- [SCRAPING_MANUAL.md](./SCRAPING_MANUAL.md) - Manual completo de scraping
- [CRON_SETUP.md](./CRON_SETUP.md) - Otras opciones de automatización
- [API_ENDPOINTS.md](./API_ENDPOINTS.md) - Documentación de endpoints

---

**Última actualización:** 15 de noviembre de 2025

**Estado:** ✅ Configurado y listo para deploy en Vercel
