# Documentación - Peña Polen

Esta carpeta contiene toda la documentación del proyecto Peña Polen, organizada por temas para facilitar la comprensión de la arquitectura y funcionamiento del sistema.

## 📚 Índice de Documentación

### 🏗️ [ARCHITECTURE.md](./ARCHITECTURE.md) **[NUEVO]**
Documentación detallada de la arquitectura del proyecto.
- Visión general del sistema
- Descripción de capas (Frontend, API, Processing, Data)
- Estructura de componentes
- Flujos de datos principales
- Patrones de diseño
- Diagrama de data flow
Documentación completa de todos los endpoints de la API REST del proyecto.
- Endpoints disponibles
- Métodos HTTP soportados
- Parámetros de request/response
- Ejemplos de uso

### 🔄 [SCRAPING_MANUAL.md](./SCRAPING_MANUAL.md)
Manual para ejecutar el scraping de datos de polen desde polenes.cl.
- Comandos para ejecutar scraping
- Configuración de Supabase
- Opciones de automatización
- Funciones disponibles
- Sistema de notificaciones

### 🚀 [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)
Guía para ejecutar scraping manualmente vía API.
- Ruta API /api/scrape
- Ejemplos con cURL, Postman, JavaScript, Python
- Alternativas de automatización
- Integración con GitHub Actions, EasyCron, etc.
Guía para configurar automatización de tareas mediante cron jobs.
- Configuración de Vercel Cron Functions
- GitHub Actions workflow
- Cron job en servidor
- Monitoreo y alertas

### 🧪 [TESTING_GUIDE.md](./TESTING_GUIDE.md)
Guía completa para testing del proyecto.
- Unit tests
- Integration tests
- End-to-end tests
- Mejores prácticas

### 🔀 [HYBRID_SCRAPING.md](./HYBRID_SCRAPING.md) **[NUEVO]**
Explicación de la estrategia de scraping híbrida.
- Dual-mode scraping (fetch vs Puppeteer)
- Optimización para Vercel Serverless
- Razones por las que Puppeteer no funciona en Vercel
- Alternativas de scraping
- Recomendaciones de producción

## 🏗️ Estructura del Proyecto

```
pena-polen/
├── docs/                          # 📁 Documentación (esta carpeta)
│   ├── README.md                  # Índice de documentación
│   ├── ARCHITECTURE.md            # Arquitectura del proyecto
│   ├── VERCEL_DEPLOYMENT.md       # Ejecución vía API
│   ├── API_ENDPOINTS.md           # Endpoints API
│   ├── SCRAPING_MANUAL.md         # Manual de scraping
│   ├── CRON_SETUP.md              # Configuración de automatización
│   └── TESTING_GUIDE.md           # Guía de testing
├── src/                           # Código fuente
│   ├── components/                # Componentes Astro/React
│   ├── lib/                       # Funciones utilitarias
│   ├── pages/                     # Rutas de la aplicación
│   ├── types/                     # Definiciones TypeScript
│   └── styles/                    # Estilos CSS
├── public/                        # Archivos estáticos
├── package.json                   # Dependencias
├── tsconfig.json                  # Configuración TypeScript
├── astro.config.mjs               # Configuración Astro
├── tailwind.config.mjs            # Configuración Tailwind
├── supabase-schema.sql            # Schema de base de datos
└── README.md                      # README principal del proyecto
```

## 🚀 Guía Rápida

### Iniciar desarrollo
```bash
npm run dev
```

### Ejecutar scraping
```bash
npm run scrape:save
```

### Ejecutar tests
```bash
npm run test
```

### Build para producción
```bash
npm run build
```

## 🔗 Información Relacionada

- **README Principal**: Ver [/README.md](../README.md) para información general del proyecto
- **Schema Base de Datos**: Ver [supabase-schema.sql](../supabase-schema.sql) para la estructura de la base de datos
- **Configuración**: Revisar archivos de configuración en la raíz (`astro.config.mjs`, `tailwind.config.mjs`, `tsconfig.json`)

## 📝 Notas Importantes

- Todas las variables de entorno deben estar configuradas en `.env` o `.env.local`
- La información de polen se obtiene de [polenes.cl](https://www.polenes.cl) mediante scraping
- Los datos se almacenan en Supabase y se actualizan periódicamente
- El sistema incluye notificaciones en tiempo real cuando hay nuevos datos

## 🤝 Contribuir

Para contribuir al proyecto:
1. Revisar la documentación relevante en esta carpeta
2. Seguir las guías de testing (TESTING_GUIDE.md)
3. Consultar los endpoints disponibles (API_ENDPOINTS.md)
4. Configurar correctamente el scraping (SCRAPING_MANUAL.md)

---

*Última actualización: 15 de noviembre de 2025*
