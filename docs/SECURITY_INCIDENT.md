# 🚨 SECURITY INCIDENT - SECRET EXPOSURE

## ¿Qué sucedió?

GitHub Secret Scanner detectó credenciales expuestas en el repositorio:
- **API Key detectada:** Supabase Anon Key (JWT token)
- **Ubicación:** Incluida en `.vercel/output/_functions/entry.mjs` durante build
- **Visibilidad:** Pública en GitHub (repositorio público)

---

## 🔴 ACCIONES REQUERIDAS INMEDIATAS

### 1. Invalidar Credenciales Comprometidas

**Supabase:**
```
1. Ve a: https://app.supabase.com/project/[PROJECT_ID]/settings/api
2. Sección "API Keys"
3. Haz clic en ⟳ junto a "anon public" para regenerar
4. Copia la nueva key
5. Actualiza en Vercel: https://vercel.com → Settings → Environment Variables
6. Redeploy la aplicación
```

**GitHub Secrets (si usas):**
```
1. Ve a: https://github.com/sebahernandez/pena-polen/settings/secrets/actions
2. Elimina cualquier secret con credenciales
3. Crea nuevos con las nuevas keys
```

### 2. Verificar Qué Fue Expuesto

El JWT token expuesto **NO es un riesgo crítico** porque:
- ✅ Es la "anon key" (público intencionalmente)
- ✅ Tiene permisos limitados (solo lectura por defecto)
- ✅ Puede ser usado solo en Supabase (no es API key universal)

**SIN EMBARGO**, aún debes regenerarla porque:
- ❌ Alguien podría hacer requests a tu Supabase directamente
- ❌ Aunque estén limitadas, es mejor ser seguro
- ❌ Esta key nunca debería estar en repositorio público

### 3. Prevenir Futura Exposición

**Verificar `.gitignore`:**
```bash
✅ .env.local está en .gitignore (correcto)
✅ .vercel/ no debe estar en git
```

**Problema encontrado:**
```
.vercel/output se regenera en cada build
Si credenciales están en memory → se incluyen en output
Solución: Usar solo environment variables en Vercel dashboard
```

---

## ✅ PASOS QUE YA COMPLETAMOS

1. ✅ Actualizado `.env.local` con placeholders
2. ✅ `.env.local` sigue en `.gitignore` (correcto)
3. ✅ Documento creado para future reference

---

## 🔧 CÓMO EVITARLO NEXT TIME

### Política de Credenciales

```
NUNCA:
❌ Commitear .env.local
❌ Incluir API keys en código
❌ Usar credenciales reales en git

SIEMPRE:
✅ Usar environment variables en Vercel dashboard
✅ Usar .env.local solo en desarrollo (gitignored)
✅ Usar .env.example con placeholders
✅ Revisar diff antes de push
```

### Pre-commit Hook (Opcional)

```bash
# .git/hooks/pre-commit
#!/bin/bash
if git diff --cached | grep -i 'eyJhbGci\|secret\|password\|api.?key'; then
  echo "❌ ERROR: Potencialmente credenciales encontradas"
  exit 1
fi
```

### Build Configuration

**astro.config.mjs:**
```typescript
// ✅ CORRECTO: Credenciales desde environment
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

// ❌ INCORRECTO: Credenciales hardcodeadas
const supabaseKey = 'eyJhbGc...';  // NUNCA HACER ESTO
```

---

## 📋 CHECKLIST DE REMEDIACIÓN

```
[ ] Regenerar API key en Supabase
[ ] Actualizar environment variable en Vercel
[ ] Redeploy aplicación en Vercel
[ ] Verificar que /api/penaflor y /api/scrape funcionan
[ ] Revisar logs en Vercel dashboard
[ ] Confirmar que Supabase connection sigue funcionando

Verificación de seguridad:
[ ] git log --all -p | grep 'eyJhbGci' = should be empty after fix
[ ] .env.local está en .gitignore
[ ] .vercel/ está en .gitignore
[ ] No hay secrets en commits recientes
```

---

## 📚 REFERENCIAS

- GitHub Secret Scanning: https://docs.github.com/en/code-security/secret-scanning
- Supabase Security: https://supabase.com/docs/guides/self-hosting/security/overview
- OWASP: https://owasp.org/www-community/attacks/Credential_Stuffing

---

**Severidad:** 🟡 MEDIA (Credencial regenerable, permisos limitados)  
**Acción:** ⚡ INMEDIATA (Regenerar key dentro de 1 hora)  
**Fecha Detectada:** 15 de noviembre de 2025  
**Status:** ⏳ PENDIENTE (Aguardando regeneración de credenciales)
