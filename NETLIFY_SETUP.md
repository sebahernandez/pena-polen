# 📋 GUÍA RÁPIDA: Migración a Netlify

## ✅ Lo que ya se hizo

```
✅ Removido: @astrojs/vercel
✅ Instalado: @astrojs/netlify
✅ Creado: netlify.toml (configuración completa)
✅ Actualizado: astro.config.mjs
✅ Actualizado: .gitignore
✅ Actualizado: Detección de entorno en polenes.ts
✅ Reducido: Timeout a 22s (< 26s de Netlify)
✅ Build: ✓ Completado exitosamente
```

---

## 🚀 PRÓXIMOS PASOS (Para ti)

### 1. Regenerar API Key de Supabase

⚠️ **CRÍTICO:** Ver `docs/SECURITY_INCIDENT.md`

```bash
1. Ve a: https://app.supabase.com/project/[ID]/settings/api
2. Haz click en ⟳ junto a "anon public"
3. Copia la NUEVA key
```

### 2. Conectar a Netlify

```bash
1. Ve a: https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Selecciona GitHub → sebahernandez/pena-polen
4. Click "Deploy site"
```

Netlify debería detectar `netlify.toml` automáticamente.

### 3. Configurar Variables de Entorno

En **Netlify Dashboard → Site Settings → Build & deploy → Environment:**

```
Nombre: PUBLIC_SUPABASE_URL
Valor: https://ukugtnppjljuidkhgrfl.supabase.co

Nombre: PUBLIC_SUPABASE_ANON_KEY
Valor: <NUEVA_KEY_DESDE_SUPABASE>
```

### 4. Disparar Deploy

```bash
# Automático: Push a main
git push origin main

# O manual:
npm install -g netlify-cli
netlify deploy --prod
```

### 5. Verificar

```
1. Espera a que Netlify termine el deploy
2. Abre la URL de tu sitio
3. Verifica "/" carga correctamente
4. Verifica "/historial" funciona
5. Verifica "/api/penaflor" devuelve datos JSON
```

---

## 📊 Comparación: Vercel → Netlify

| Aspecto | Vercel | Netlify | Ventaja |
|--------|--------|---------|---------|
| Bundle Limit | 50MB | 250MB | ✅ Netlify |
| Timeout | 30s | 26s | ~ Similar |
| Setup | Sencillo | Sencillo | ~ Igual |
| Cost | Generoso | Generoso | ~ Igual |
| Monitoreo | Built-in | Built-in | ~ Igual |

---

## 🔍 Qué Cambió en el Código

### Detección de Entorno

```typescript
// ANTES (Vercel)
if (process.env.VERCEL === '1') { ... }

// AHORA (Netlify)
if (process.env.NETLIFY === 'true') { ... }
```

**Ubicaciones:**
- `src/lib/polenes.ts` (2 cambios)
- `src/pages/api/scrape.ts` (1 cambio)

### Timeout

```typescript
// ANTES: 25s (< 30s de Vercel)
setTimeout(() => reject(...), 25000)

// AHORA: 22s (< 26s de Netlify)
setTimeout(() => reject(...), 22000)
```

---

## 📁 Archivos Nuevos/Removidos

### Nuevos
```
✅ netlify.toml - Configuración completa
✅ docs/NETLIFY_DEPLOYMENT.md - Documentación
```

### Removidos
```
❌ vercel.json
❌ .vercelignore
❌ .vercel/
```

### Actualizados
```
📝 astro.config.mjs
📝 .gitignore
📝 src/lib/polenes.ts
📝 src/pages/api/scrape.ts
```

---

## 🆘 Si Algo Falla

### Build Falla en Netlify

```
1. Ve a: Netlify Dashboard → Deploys → selecciona deploy fallido
2. Click "Deploy log" y busca el error
3. Verifica variables de entorno
4. Ejecuta npm run build localmente para debug
```

### API Timeout

```
Sitio polenes.cl lento:
- Ya implementado: 2 reintentos automáticos
- Ya configurado: timeout de 15s en fetch
- Si sigue fallando: revisar logs de Netlify
```

### Supabase No Conecta

```
1. Verifica PUBLIC_SUPABASE_URL está en env vars
2. Verifica PUBLIC_SUPABASE_ANON_KEY es válida (regenerada)
3. Redeploy después de cambiar env vars
```

---

## ✨ Ventajas Netlify para Este Proyecto

1. **Bundle Size:** 250MB vs 50MB
   - Más margen para dependencias futuras
   - Menos preocupación por tamaño

2. **Mejor para Desarrollo:**
   - Mismo flujo local
   - Mejor manejo de edge cases

3. **Configuración:**
   - `netlify.toml` es más legible que `vercel.json`
   - Mejor integración de Git

4. **Monitoreo:**
   - Buena visibilidad de builds
   - Logs detallados disponibles

---

## 📚 Enlaces Útiles

- [Netlify App](https://app.netlify.com/)
- [Netlify Docs](https://docs.netlify.com/)
- [Astro + Netlify](https://docs.astro.build/en/guides/deploy/netlify/)
- [Netlify CLI](https://cli.netlify.com/)

---

## ✅ CHECKLIST FINAL

```
PRE-DEPLOYMENT:
[ ] Regenerar API key en Supabase ⚠️ CRÍTICO
[ ] Conectar repo a Netlify
[ ] Configurar env vars en Netlify
[ ] Verificar netlify.toml existe
[ ] npm run build pasa sin errores

POST-DEPLOYMENT:
[ ] "/" carga
[ ] "/historial" funciona
[ ] "/api/penaflor" devuelve datos
[ ] "/api/scrape" responde
[ ] Supabase connection funciona
[ ] Logs de Netlify limpios (sin errores)
[ ] Sitio en producción está estable
```

---

**Status:** ✅ Código migrado, listo para deploy  
**Próxima acción:** Conectar a Netlify y disparar deploy  
**Tiempo estimado:** 5-10 minutos
