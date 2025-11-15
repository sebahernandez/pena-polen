# 🌼 Peña Polen

Sistema inteligente de información sobre niveles de polen en Peñaflor. Consulta datos históricos y pronósticos para cuidar tu salud respiratoria.

## 📋 Contenido

- [Características](#características)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Comandos](#comandos)
- [Documentación](#documentación)
- [Configuración](#configuración)

## ✨ Características

✅ **Scraping Automático** - Extrae datos de [polenes.cl](https://www.polenes.cl)
✅ **Base de Datos** - Almacenamiento en Supabase
✅ **Notificaciones** - Alertas en tiempo real de nuevos datos
✅ **Mapa Interactivo** - Visualiza zonas de monitoreo
✅ **Historial** - Consulta datos históricos
✅ **Pronóstico** - Predicciones de niveles de polen
✅ **Interfaz Moderna** - Diseño responsive con glass-morphism
✅ **Modo Oscuro** - Tema light/dark automático

## 🏗️ Estructura del Proyecto

```
pena-polen/
├── docs/                          # 📚 Documentación completa
│   ├── README.md                  # Índice de documentación
│   ├── API_ENDPOINTS.md           # API REST endpoints
│   ├── SCRAPING_MANUAL.md         # Manual de scraping
│   ├── CRON_SETUP.md              # Automatización
│   └── TESTING_GUIDE.md           # Guía de testing
├── src/
│   ├── components/                # Componentes Astro/React
│   │   ├── Header.astro           # Navbar con navegación
│   │   ├── Footer.astro           # Footer
│   │   ├── map/                   # Componente mapa
│   │   └── tablehistory/          # Tabla de historial
│   ├── lib/
│   │   ├── polenes.ts            # Scraping de datos
│   │   └── supabase.ts           # Cliente Supabase
│   ├── pages/
│   │   ├── index.astro           # Página principal
│   │   ├── historial.astro       # Página historial
│   │   └── api/                  # Endpoints API
│   ├── types/
│   │   └── supabase.ts           # Tipos TypeScript
│   └── styles/
│       └── global.css            # Estilos globales
├── public/                        # Archivos estáticos
├── supabase-schema.sql           # Schema de BD
├── package.json
├── tsconfig.json
├── astro.config.mjs
├── tailwind.config.mjs
└── .env / .env.local             # Variables de entorno
```

## 🚀 Instalación

### Requisitos
- Node.js 18+
- npm o pnpm
- Cuenta Supabase (opcional pero recomendado)

### Pasos

1. **Clonar el repositorio**
```bash
git clone <repo-url>
cd pena-polen
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env.local
# Editar .env.local con tus credenciales de Supabase
```

4. **Iniciar desarrollo**
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:4321`

## 📝 Comandos

| Comando | Descripción |
|---------|------------|
| `npm run dev` | Inicia servidor de desarrollo |
| `npm run build` | Build para producción |
| `npm run preview` | Preview del build |
| `npm run scrape` | Ejecuta scraping sin guardar |
| `npm run scrape:save` | Ejecuta scraping y guarda en Supabase |
| `npm run test` | Ejecuta tests |

## 📚 Documentación

Toda la documentación técnica está centralizada en la carpeta [`docs/`](./docs/):

- **[API_ENDPOINTS.md](./docs/API_ENDPOINTS.md)** - Endpoints disponibles
- **[SCRAPING_MANUAL.md](./docs/SCRAPING_MANUAL.md)** - Cómo ejecutar scraping
- **[CRON_SETUP.md](./docs/CRON_SETUP.md)** - Automatización de tareas
- **[TESTING_GUIDE.md](./docs/TESTING_GUIDE.md)** - Guía de testing

Accede a [docs/README.md](./docs/README.md) para ver el índice completo.

## ⚙️ Configuración

### Variables de Entorno

```env
# Supabase
PUBLIC_SUPABASE_URL=https://your-supabase-url.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Base de Datos

Para configurar la base de datos, ejecuta el script SQL:
```bash
psql -U postgres -d your_db -f supabase-schema.sql
```

O importa el contenido en Supabase SQL Editor.

## 🔗 Enlaces Útiles

- [Polenes.cl](https://www.polenes.cl) - Fuente de datos
- [Astro Docs](https://docs.astro.build)
- [Tailwind CSS](https://tailwindcss.com)
- [Supabase Docs](https://supabase.com/docs)

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

---

**Última actualización:** 15 de noviembre de 2025
