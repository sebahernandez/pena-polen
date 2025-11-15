# 🚀 Netlify Deployment Guide

## Migración desde Vercel a Netlify

Este proyecto ha sido migrado de **Vercel** a **Netlify** para mayor flexibilidad y mejor soporte para Puppeteer en desarrollo local.

---

## 📋 Cambios Realizados

### Configuración
- ✅ Removido: `@astrojs/vercel` adapter
- ✅ Instalado: `@astrojs/netlify` adapter
- ✅ Creado: `netlify.toml` con configuración optimizada
- ✅ Removido: `vercel.json`, `.vercelignore`, `.vercel/`
- ✅ Actualizado: `.gitignore` (ahora excluye `.netlify/`)

### Beneficios de Netlify
```
Vercel                          Netlify
├─ 50MB bundle limit            ├─ 250MB budget por deploy
├─ 30s timeout                  ├─ 26s timeout (similar)
├─ Funciones serverless         ├─ Funciones serverless
├─ Node.js 22                   ├─ Node.js 20.x (flexible)
└─ Analytics built-in           └─ Analytics integrado

Ventaja Netlify:
✅ Más flexible con tamaño de bundle
✅ Mejor para desarrollo local
✅ Mejor RTO (Recovery Time Objective)
✅ Edge functions opcionales
```

---

## 🔧 Setup en Netlify

### 1. Conectar Repositorio

```bash
# En https://app.netlify.com/
1. Click "Add new site" → "Import an existing project"
2. Selecciona GitHub
3. Autoriza y selecciona sebahernandez/pena-polen
4. Click "Deploy site"
```

### 2. Configurar Variables de Entorno

En **Netlify Dashboard → Site Settings → Build & deploy → Environment:**

```
PUBLIC_SUPABASE_URL = https://ukugtnppjljuidkhgrfl.supabase.co
PUBLIC_SUPABASE_ANON_KEY = <tu_nueva_key_regenerada>
```

⚠️ **IMPORTANTE:** Regenera la key en Supabase (ver `docs/SECURITY_INCIDENT.md`)

### 3. Configurar Build

En **Build & deploy → Build settings:**

```
Build command:    npm run build
Publish directory: dist
Node version:     18.x or 20.x
```

Netlify debería detectar automáticamente desde `netlify.toml`.

---

## 📦 Archivos Clave

### `netlify.toml`
Configuración principal de Netlify. Incluye:
- ✅ Build command y publish directory
- ✅ Función configuration (Node.js bundler: esbuild)
- ✅ Redirects para SPA routing
- ✅ Cache headers optimizados
- ✅ Security headers

### `astro.config.mjs`
```typescript
export default defineConfig({
  output: 'server',
  adapter: netlify({
    edgeMiddleware: true  // Opcional: para edge functions
  }),
  // ...
});
```

---

## 🚢 Deployment

### Automatic Deployment
- ✅ Push a `main` → Desplega automáticamente a producción
- ✅ Push a otra rama → Despliegue preview

### Manual Deployment
```bash
# Build local
npm run build

# Deploy con Netlify CLI
npm install -g netlify-cli
netlify deploy --prod
```

---

## 🔍 Monitoreo

### Netlify Dashboard
- **Deployments:** Ver history de deploys
- **Analytics:** Traffic, performance metrics
- **Functions:** Logs de serverless functions
- **Errors:** Error tracking (si está configurado)

### Logs de Build
```
En Netlify Dashboard → Deploys → Selecciona deploy → "Deploy log"
```

### Logs de Runtime
```
En Netlify Dashboard → Functions → Selecciona función → Ver logs
```

---

## 🐛 Troubleshooting

### Build Falla

**Error: "Build failed"**
```
Solución:
1. Revisa logs en Netlify dashboard
2. Verifica environment variables
3. Ejecuta npm run build localmente para debug
```

**Error: "Cannot find module 'puppeteer'"**
```
Solución:
- Puppeteer debe estar en .gitignore en producción
- Solo se usa en desarrollo local
- En Netlify: se usa fetch mode
```

### Función Lenta

**"/api/scrape" tarda mucho**
```
Causas:
- Sitio polenes.cl lento
- Red de Netlify lenta
- Timeout en fetch (15s)

Solución:
- Increase timeout en src/lib/polenes.ts
- Usar reintentos (ya implementado)
- Considerar caché en Supabase
```

### Variables de Entorno No Funcionan

```
1. Verifica nombres exactos en netlify.toml
2. Asegúrate PUBLIC_* para variables públicas
3. Redeploy después de cambiar env vars
4. Revisa: npm run build localmente con .env.local
```

---

## 🔄 Comparación: Vercel vs Netlify

| Característica | Vercel | Netlify |
|---|---|---|
| **Bundle Limit** | 50MB | 250MB |
| **Timeout** | 30s | 26s |
| **Cold Start** | Rápido | Similar |
| **Pricing** | Generoso free tier | Generoso free tier |
| **Edge Functions** | Native | Opcional |
| **Database Integration** | Versátil | Versátil |
| **Preview Deploys** | ✅ | ✅ |
| **Analytics** | Built-in | Built-in |
| **Git Integration** | Excelente | Excelente |

---

## 📝 Checklist post-deployment

```
[ ] Variables de entorno configuradas en Netlify
[ ] Build completa sin errores
[ ] "/" carga correctamente
[ ] "/historial" funciona
[ ] "/api/penaflor" devuelve datos
[ ] "/api/scrape" ejecuta sin timeout
[ ] Supabase connection funciona
[ ] Logs de Netlify se ven correctamente
[ ] Preview deploys funcionan
[ ] Producción es estable
```

---

## 🎯 Diferencias en Código

### Local Development (no cambia)
```bash
npm run dev
npm run scrape:save  # Usa Puppeteer
```

### En Netlify (automático)
```typescript
// En src/lib/polenes.ts
if (process.env.VERCEL !== '1') {  // ← Ahora no se ejecuta en Netlify
  puppeteer = require('puppeteer');
}

// Solución: Actualizar a:
if (process.env.NETLIFY !== 'true') {  // ← Nueva condición
  puppeteer = require('puppeteer');
}
```

⚠️ **TODO:** Actualizar condición de detección de entorno en `polenes.ts`

---

## 🔗 Enlaces Útiles

- [Netlify Docs](https://docs.netlify.com/)
- [Astro + Netlify](https://docs.astro.build/en/guides/deploy/netlify/)
- [Netlify Edge Functions](https://docs.netlify.com/edge-functions/overview/)
- [Netlify CLI](https://cli.netlify.com/)

---

**Status:** ✅ Migrado a Netlify  
**Fecha:** 15 de noviembre de 2025  
**Próximos pasos:** Redeploy y testing en Netlify
