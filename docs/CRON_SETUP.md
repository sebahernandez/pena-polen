# Configuración de Scraping Automático (Cron Job)

## Problema Actual
El sistema de paginación funciona correctamente, pero no hay suficientes registros históricos porque el scraping solo se ejecuta manualmente. Para acumular datos y aprovechar la paginación, necesitas ejecutar el scraping regularmente.

## Solución: Automatizar el Scraping

### Opción 1: Cron Job en Linux/macOS

#### 1. Crear un script de scraping
Crea un archivo `run-scraping.sh`:

```bash
#!/bin/bash
cd /Users/sebacure/Desktop/proyectos/pena-polen
export DOTENV_CONFIG_PATH=.env.local
npm run scrape:save >> logs/scraping.log 2>&1
echo "Scraping ejecutado: $(date)" >> logs/scraping.log
```

#### 2. Dar permisos de ejecución
```bash
chmod +x run-scraping.sh
mkdir -p logs
```

#### 3. Configurar crontab
```bash
crontab -e
```

Agregar una de estas líneas según la frecuencia deseada:

```bash
# Cada día a las 8:00 AM
0 8 * * * /Users/sebacure/Desktop/proyectos/pena-polen/run-scraping.sh

# Cada 12 horas (8 AM y 8 PM)
0 8,20 * * * /Users/sebacure/Desktop/proyectos/pena-polen/run-scraping.sh

# Cada 6 horas
0 */6 * * * /Users/sebacure/Desktop/proyectos/pena-polen/run-scraping.sh

# Todos los días a las 9 AM, 3 PM y 9 PM
0 9,15,21 * * * /Users/sebacure/Desktop/proyectos/pena-polen/run-scraping.sh
```

#### 4. Verificar que el cron esté activo
```bash
crontab -l
```

### Opción 2: GitHub Actions (Recomendado para Producción)

Crea `.github/workflows/scheduled-scraping.yml`:

```yaml
name: Scheduled Pollen Scraping

on:
  schedule:
    # Ejecutar todos los días a las 8 AM UTC (5 AM Chile)
    - cron: '0 8 * * *'
  workflow_dispatch: # Permite ejecución manual

jobs:
  scrape:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run scraping
        env:
          PUBLIC_SUPABASE_URL: ${{ secrets.PUBLIC_SUPABASE_URL }}
          PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.PUBLIC_SUPABASE_ANON_KEY }}
        run: npm run scrape:save
```

**No olvides agregar los secretos en GitHub:**
1. Ve a Settings → Secrets and variables → Actions
2. Agrega `PUBLIC_SUPABASE_URL` y `PUBLIC_SUPABASE_ANON_KEY`

### Opción 3: Vercel Cron Jobs

Si despliegas en Vercel, puedes usar sus Cron Jobs:

1. Crea `vercel.json`:
```json
{
  "crons": [
    {
      "path": "/api/scrape",
      "schedule": "0 8 * * *"
    }
  ]
}
```

2. Asegúrate de que el endpoint `/api/scrape` esté protegido:

```typescript
// src/pages/api/scrape.ts
export const POST: APIRoute = async ({ request }) => {
  // Validar que viene de Vercel Cron
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${import.meta.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }
  
  // Ejecutar scraping...
};
```

### Opción 4: Ejecutar Manualmente con Recordatorio

Si prefieres control manual, crea recordatorios diarios:

```bash
# Ejecutar una vez al día
npm run scrape:save
```

## Frecuencia Recomendada

### Para Acumular Datos Rápidamente (Primera Semana)
- **3 veces al día** (mañana, tarde, noche)
- En ~17 días tendrás 50+ registros

### Para Mantenimiento (Después de tener >50 registros)
- **1 vez al día** es suficiente
- Mantiene el historial actualizado

### Consideraciones
- Los datos de polen suelen actualizarse diariamente en la fuente
- No tiene sentido ejecutar más de 3-4 veces al día
- Cada ejecución crea un registro único con timestamp

## Verificar que el Scraping está Funcionando

### Ver logs del cron
```bash
tail -f logs/scraping.log
```

### Consultar directamente a la base de datos
```sql
SELECT COUNT(*) as total_registros, 
       MAX(created_at) as ultimo_scraping
FROM pollen_records
WHERE city = 'Santiago';
```

### Ver en la aplicación
1. Abre la página de Historial
2. Verás un badge azul con el total de registros
3. Si hay menos de 10, aparecerá una advertencia amarilla

## Monitoreo

### Crear un script de monitoreo
Crea `check-records.sh`:

```bash
#!/bin/bash
echo "Verificando registros en la base de datos..."
curl "https://tu-dominio.com/api/history?city=Santiago&limit=100" | jq '.meta.total'
```

## Resumen de Timeframes

| Frecuencia | Registros en 30 días | Registros en 60 días |
|------------|---------------------|---------------------|
| 1x día | 30 | 60 |
| 2x día | 60 | 120 |
| 3x día | 90 | 180 |

**Recomendación:** Comienza con 2-3 veces al día por 2-3 semanas para tener suficientes datos, luego reduce a 1 vez al día.

## Troubleshooting

### El cron no ejecuta
```bash
# Verificar que cron esté corriendo
pgrep cron

# Ver logs del sistema
grep CRON /var/log/syslog
```

### Variables de entorno no se cargan
Asegúrate de que el script exporta las variables:
```bash
export DOTENV_CONFIG_PATH=/ruta/absoluta/.env.local
```

### Errores de permisos
```bash
chmod +x run-scraping.sh
chown usuario:usuario run-scraping.sh
```

## Próximos Pasos

1. ✅ Elige una opción de automatización
2. ✅ Configura la frecuencia (recomendado: 2x día inicialmente)
3. ✅ Espera 1-2 semanas para acumular >20 registros
4. ✅ Verifica en la interfaz que la paginación funcione
5. ✅ Ajusta la frecuencia según necesites
