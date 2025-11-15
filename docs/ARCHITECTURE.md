# 🏗️ Arquitectura del Proyecto

Documento que describe la arquitectura general, componentes principales y patrones utilizados en Peña Polen.

## 📐 Visión General

```
┌─────────────────────────────────────────────────────────────┐
│                    PEÑA POLEN ARCHITECTURE                   │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Frontend Layer (Astro + React)                             │
│  ├── Pages (Astro)                                          │
│  ├── Components (Astro + React)                             │
│  └── Styling (Tailwind CSS)                                 │
│                                                               │
│  API Layer (Astro Endpoints)                                │
│  ├── /api/penaflor       (Get current/latest pollen data)   │
│  ├── /api/history        (Get historical pollen data)       │
│  └── /api/scrape         (Trigger scraping)                 │
│                                                               │
│  Data Processing Layer                                       │
│  ├── Scraping (Puppeteer)  → polenes.cl                    │
│  ├── Parsing (Cheerio)     → Extract data                  │
│  └── Storage (Supabase)    → PostgreSQL                    │
│                                                               │
│  External Services                                           │
│  ├── Supabase (Database & Auth)                             │
│  ├── Polenes.cl (Data source)                               │
│  └── Vercel / GitHub Actions (Automation)                   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## 🎯 Capas de la Aplicación

### 1. Frontend Layer

**Tecnologías:**
- Astro 5 (Meta framework)
- React (Componentes interactivos)
- TypeScript (Type safety)
- Tailwind CSS (Styling)

**Estructura:**

```
src/
├── pages/
│   ├── index.astro          # Página principal con 4 secciones
│   ├── historial.astro      # Página de historial
│   └── api/
│       ├── penaflor.ts      # GET pollen data
│       ├── history.ts       # GET historical data
│       └── scrape.ts        # POST trigger scraping
│
├── components/
│   ├── Header.astro         # Navbar fijo con scroll navigation
│   ├── Footer.astro         # Footer con disclaimer
│   ├── ForecastCards.astro  # Cards de pronóstico
│   ├── map/
│   │   ├── index.tsx        # Mapa interactivo (React)
│   │   └── utils.ts         # Utilidades del mapa
│   └── tablehistory/
│       ├── index.tsx        # Tabla de historial
│       ├── hooks.ts         # Custom hooks
│       ├── types.ts         # Types para tabla
│       ├── utils.ts         # Utilidades
│       ├── HistoryTable.tsx # Componente tabla
│       ├── PaginationControls.tsx
│       ├── PollenChart.tsx
│       ├── SummaryCards.tsx
│       ├── TableFilters.tsx
│       └── README.md
│
└── layouts/
    └── Layout.astro         # Layout principal
```

**Flujo de Datos Frontend:**
```
Index.astro (4 sections)
    ├── Header (Navigation + Notifications)
    ├── Hero Section
    ├── Map Section (React Component)
    ├── History Section (React Component)
    ├── Forecast Section
    └── Footer (Disclaimer)
```

### 2. API Layer (Endpoints)

**Base:** `/api/` routes (Astro Endpoints)

#### GET `/api/penaflor`
```typescript
// Query params:
// - action: 'latest' | 'current' | 'status'
// 
// Response:
{
  city: 'Santiago',
  date: 'jueves, 6 de noviembre de 2025 al miércoles, 12 de noviembre de 2025',
  levels: [
    { type: 'total de árboles', level: 'MEDIOS', concentration: 80 },
    { type: 'plátano oriental', level: 'MEDIOS', concentration: 11 },
    { type: 'pastos', level: 'MEDIOS', concentration: 26 },
    { type: 'malezas', level: 'BAJOS', concentration: 9 }
  ],
  forecast: 'Comentarios: ... | Pronóstico: ... | Recomendaciones: ...'
}
```

#### GET `/api/history`
```typescript
// Query params:
// - city: string (default: 'Santiago')
// - limit: number (default: 10)
// - offset: number (default: 0)
//
// Response: PollenData[]
```

#### POST `/api/scrape`
```typescript
// Body: { action: 'scrape' | 'scrape-save' }
//
// Response:
{
  success: boolean,
  message: string,
  data?: PollenData
}
```

### 3. Data Processing Layer

**Componentes:**

#### Scraper (`src/lib/polenes.ts`)
- **Función:** Extrae datos de polenes.cl
- **Tecnología:** Puppeteer + Cheerio
- **Proceso:**
  1. Lanza navegador headless
  2. Navega a `https://www.polenes.cl/?pagina=niveles&ciudad=4` (Santiago)
  3. Espera carga de contenido
  4. Parsea HTML con Cheerio
  5. Extrae concentraciones de polen (g/m³)
  6. Mapea a niveles (ALTOS/MEDIOS/BAJOS)
  7. Retorna `PollenData`

#### Storage (`src/lib/supabase.ts`)
- **Servicio:** `SupabasePollenService`
- **Métodos principales:**
  - `savePollenData()` - Guarda datos scraped
  - `getLatestPollenData()` - Obtiene último registro
  - `getPollenDataByCity()` - Datos por ciudad
  - `getPollenDataByDateRange()` - Datos en rango de fechas
  - `testConnection()` - Verifica conexión

### 4. Database Layer

**Base de Datos:** PostgreSQL (Supabase)

**Schema:**

```sql
-- Tabla principal de registros
pollen_records (
  id: uuid (PK),
  city: varchar,
  date: varchar,
  period: varchar,
  created_at: timestamp,
  updated_at: timestamp
)

-- Tabla de niveles de polen
pollen_levels (
  id: uuid (PK),
  pollen_record_id: uuid (FK),
  type: varchar,      -- e.g., 'total de árboles', 'plátano oriental'
  level: varchar,     -- 'ALTOS', 'MEDIOS', 'BAJOS'
  description: text,
  concentration: number (g/m³)
)

-- Tabla de pronósticos
pollen_forecasts (
  id: uuid (PK),
  pollen_record_id: uuid (FK),
  forecast_text: text
)
```

## 🔄 Flujos Principales

### 1. Flujo de Scraping

```
npm run scrape:save
    ↓
scrapeAndSavePollenData()
    ↓
scrapePollenData() (Puppeteer + Cheerio)
    ↓
Extrae de polenes.cl
    ↓
SupabasePollenService.savePollenData()
    ↓
Guarda en PostgreSQL
    ↓
✅ Notificación generada
```

### 2. Flujo de Visualización

```
GET /api/penaflor
    ↓
getLatestPollenData()
    ↓
Query a Supabase
    ↓
Retorna PollenData + levels + forecast
    ↓
Frontend renderiza en Header (notificación)
Frontend renderiza en Main (cards/tabla)
```

### 3. Flujo de Notificaciones

```
Scraping completado
    ↓
Datos guardados en Supabase
    ↓
Frontend verifica cada 30s
    ↓
Detecta nuevos datos
    ↓
Renderiza badge animado
    ↓
Muestra dropdown con niveles
```

## 🎨 Patrones de Diseño

### 1. Responsive Design
- **Mobile First:** Estilos base para 340px+
- **Breakpoints:** sm:640px, md:768px, lg:1024px, xl:1280px
- **Componentes:** Se adaptan a viewport

### 2. Glass Morphism
- **Navbar:** `backdrop-blur-xl`, `bg-white/75`, `border-white/30`
- **Cards:** Mismo patrón con gradientes sutiles
- **Efectos hover:** Aumentan backdrop y shadow

### 3. State Management
- **Frontend:** DOM-based + React hooks
- **Scroll Navigation:** Event listeners pasivos
- **Notificaciones:** Polling cada 30s

### 4. Error Handling
- **Scraping:** Try-catch con fallbacks
- **API:** Error messages descriptivos
- **Supabase:** Warnings en console, continúa sin BD

## 🚀 Deployment Architecture

```
GitHub Repository
    ↓
├─ Commits a main
│   ↓
│   Deploy a Vercel
│       ↓
│       Build Astro
│       ↓
│       Deploy a Edge Network
│
├─ Automation Options
│   ├─ Vercel Cron Functions (cada 6 horas)
│   ├─ GitHub Actions (scheduled)
│   └─ External Cron (servidor propio)
```

## 📊 Data Flow Diagram

```
[Polenes.cl]
      ↓
  [Puppeteer]
      ↓
 [Scraped HTML]
      ↓
   [Cheerio]
      ↓
 [Parsed Data]
      ↓
 [Type Mapping]
      ↓
[PollenData JSON]
      ↓
┌─────────────────────────────────────┐
│      Supabase PostgreSQL DB         │
├─────────────────────────────────────┤
│ - pollen_records                    │
│ - pollen_levels                     │
│ - pollen_forecasts                  │
└─────────────────────────────────────┘
      ↓
  [API Endpoints]
      ↓
┌─────────────────────────────────────┐
│      Frontend (Astro + React)       │
├─────────────────────────────────────┤
│ - Header (Notifications)            │
│ - Hero Section                      │
│ - Interactive Map                   │
│ - History Table                     │
│ - Forecast Cards                    │
│ - Footer (Disclaimer)               │
└─────────────────────────────────────┘
      ↓
  [Browser / User]
```

## 🔧 Tecnologías Clave

| Tecnología | Propósito | Versión |
|-----------|----------|---------|
| Astro | Meta framework | 5.14+ |
| React | Componentes interactivos | 18+ |
| TypeScript | Type safety | 5+ |
| Tailwind CSS | Styling | 4+ |
| Supabase | Backend & Database | Latest |
| Puppeteer | Web scraping | Latest |
| Cheerio | HTML parsing | Latest |
| Vercel | Hosting | - |

## 📝 Principios de Arquitectura

1. **Separación de Capas:** Frontend, API, Processing, Data
2. **Type Safety:** TypeScript en todo el proyecto
3. **Error Handling:** Graceful degradation
4. **Performance:** Passive listeners, lazy loading
5. **Scalability:** Modular components, reusable services
6. **Documentation:** Inline comments + docs/ folder

---

**Última actualización:** 15 de noviembre de 2025
