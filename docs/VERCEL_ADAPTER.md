# ✅ Configuración de Adapter Vercel

Guía de la configuración del adapter de Vercel para Astro.

## 🔧 Cambios Realizados

### 1. Instalación del Adapter
```bash
npm install @astrojs/vercel
```

### 2. Configuración en `astro.config.mjs`

Se agregaron:
```javascript
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  output: 'server',
  adapter: vercel({
    webAnalytics: {
      enabled: false
    }
  }),
  // ... resto de configuración
});
```

## ✅ Build Status

El proyecto ahora compila correctamente para Vercel:
- ✅ Server entrypoints compilados
- ✅ Client assets optimizados
- ✅ Bundled functions creadas
- ✅ Static files copiados
- ⚠️ Nota: Vercel usará Node.js 22 en producción (automático)

## 🚀 Deploy en Vercel

### Opción 1: Automático (Recomendado)

1. Push a tu repositorio:
```bash
git add .
git commit -m "feat: Agregar adapter Vercel para Astro"
git push origin main
```

2. Vercel detectará automáticamente:
   - El archivo `astro.config.mjs` con adapter
   - Ejecutará `npm run build`
   - Deployará la aplicación

### Opción 2: Manual con Vercel CLI

```bash
# Instalar CLI de Vercel
npm install -g vercel

# Deploy
vercel
```

## 📝 Configuración en Vercel Dashboard

No requiere configuración adicional porque:
- ✅ El adapter está configurado en el código
- ✅ Astro detecta automáticamente que es Vercel
- ✅ Las variables de entorno están en `.env.local`

### Agregar Variables de Entorno en Vercel (si falta)

Si el deploy falla por variables de entorno:

1. Ve a Vercel Dashboard → Proyecto
2. Settings → Environment Variables
3. Agrega:
   - `PUBLIC_SUPABASE_URL`
   - `PUBLIC_SUPABASE_ANON_KEY`

## 🔗 Archivos Relevantes

- `astro.config.mjs` - Configuración del adapter
- `package.json` - Dependencies
- `.env.local` - Variables locales (NO se pushea)
- `.env.example` - Plantilla de variables

## 📊 Build Output

Cuando haces `npm run build`:

```
✓ Completed in 758ms - Recopila info de build
✓ built in 430ms   - Compila server
✓ 2501 modules transformed - Transpila client
✓ built in 1.45s   - Optimiza assets
✓ Bundling function - Empaqueta serverless
✓ Complete!        - Build exitoso
```

## 🚨 Errores Comunes y Soluciones

### Error: "No adapter installed"
```
✅ SOLUCIONADO: Se instaló @astrojs/vercel
```

### Error: "Deprecated import"
```
La advertencia aparece si usas "@astrojs/vercel/serverless"
Usamos esa versión por compatibilidad, pero es segura.
```

### Error: Variables de entorno no encontradas
```
Solución: Agregar en Vercel Dashboard → Settings → Environment Variables
```

## ✨ Próximas Ejecuciones

A partir de ahora:
1. Los builds en Vercel funcionarán automáticamente
2. El adapter maneja toda la optimización
3. La API routes (`/api/scrape`, etc.) funcionarán correctamente

## 📚 Documentación Relacionada

- [Astro Vercel Adapter Docs](https://docs.astro.build/es/guides/integrations-guide/vercel/)
- [Vercel Deployments](https://vercel.com/docs/deployments/overview)

---

**Última actualización:** 15 de noviembre de 2025

**Estado:** ✅ Adapter configurado y validado
