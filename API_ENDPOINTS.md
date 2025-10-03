# API ENDPOINTS - POLEN PEÑAFLOR

## 🌐 Base URL
```
http://localhost:4321/api
```

---

## 📊 **ENDPOINT: `/api/penaflor`**
Obtiene información actual y específica de polen para Peñaflor/Santiago

### **GET Requests:**

#### 1. **Último registro** (Default)
```
GET /api/penaflor
GET /api/penaflor?action=latest
```
**Descripción:** Obtiene el último registro de polen disponible

#### 2. **Registro actual de Peñaflor**
```
GET /api/penaflor?action=current
```
**Descripción:** Obtiene el registro más reciente específico de la zona

#### 3. **Estado del sistema**
```
GET /api/penaflor?action=status
```
**Descripción:** Verifica el estado del sistema y conexión a base de datos

#### 4. **Con detalles completos**
```
GET /api/penaflor?action=latest&details=true
GET /api/penaflor?action=current&details=true
```
**Descripción:** Incluye metadatos y información extendida

### **Respuesta Ejemplo:**
```json
{
  "success": true,
  "message": "Último registro de polen obtenido",
  "data": {
    "city": "Santiago",
    "date": "jueves, 18 de septiembre de 2025 al miércoles, 24 de septiembre de 2025",
    "levels": [
      {
        "type": "plátano oriental",
        "level": "ALTOS"
      },
      {
        "type": "arce",
        "level": "ALTOS"
      }
    ],
    "summary": {
      "totalTypes": 4,
      "highLevels": 4,
      "mediumLevels": 0,
      "lowLevels": 0
    }
  },
  "timestamp": "2025-10-02T21:15:30.123Z"
}
```

---

## 📈 **ENDPOINT: `/api/history`**
Obtiene registros históricos de polen

### **GET Requests:**

#### 1. **Historial por ciudad** (Default)
```
GET /api/history
GET /api/history?city=Santiago
GET /api/history?city=Santiago&limit=10
```
**Parámetros:**
- `city` (opcional): Ciudad a consultar (default: "Santiago")
- `limit` (opcional): Número de registros (default: 10)

#### 2. **Historial por rango de fechas**
```
GET /api/history?startDate=2025-01-01&endDate=2025-12-31
```
**Parámetros:**
- `startDate` (requerido): Fecha inicio (YYYY-MM-DD)
- `endDate` (requerido): Fecha fin (YYYY-MM-DD)

#### 3. **Historial extendido**
```
GET /api/history?limit=50
GET /api/history?city=Santiago&limit=20
```

### **Respuesta Ejemplo:**
```json
{
  "success": true,
  "message": "2 registros históricos encontrados",
  "data": [
    {
      "city": "Santiago",
      "date": "jueves, 18 de septiembre de 2025 al miércoles, 24 de septiembre de 2025",
      "levels": [
        {
          "type": "plátano oriental",
          "level": "ALTOS",
          "description": "Nivel altos pronosticado"
        }
      ],
      "forecast": "Comentarios: Niveles ALTOS..."
    }
  ],
  "meta": {
    "total": 2,
    "city": "Santiago",
    "limit": 10,
    "hasDateRange": false
  }
}
```

---

## 🔧 **CÓDIGOS DE ESTADO HTTP**

| Código | Descripción |
|--------|-------------|
| `200` | ✅ Éxito - Datos obtenidos correctamente |
| `400` | ❌ Error - Parámetros inválidos |
| `404` | ⚠️ No encontrado - Sin registros |
| `500` | 💥 Error del servidor |
| `503` | 🔌 Servicio no disponible - Sin conexión BD |

---

## 📋 **COLECCIÓN POSTMAN**

### **Requests sugeridos para probar:**

1. **Obtener último registro**
   ```
   GET {{baseUrl}}/api/penaflor
   ```

2. **Obtener registro actual con detalles**
   ```
   GET {{baseUrl}}/api/penaflor?action=current&details=true
   ```

3. **Verificar estado del sistema**
   ```
   GET {{baseUrl}}/api/penaflor?action=status
   ```

4. **Obtener historial de Santiago**
   ```
   GET {{baseUrl}}/api/history?city=Santiago&limit=5
   ```

5. **Obtener historial por fechas**
   ```
   GET {{baseUrl}}/api/history?startDate=2025-01-01&endDate=2025-12-31
   ```

### **Variables de entorno Postman:**
```json
{
  "baseUrl": "http://localhost:4321"
}
```

---

## 🎯 **HEADERS RECOMENDADOS**

```
Content-Type: application/json
Accept: application/json
```

---

## 🚀 **PARA COMENZAR:**

1. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

2. El servidor estará disponible en:
   ```
   http://localhost:4321
   ```

3. Prueba los endpoints en Postman usando las URLs de ejemplo

---

## 🔍 **DEBUGGING**

Si hay problemas:
- Verifica que Supabase esté configurado
- Revisa la consola del servidor para errores
- Usa `/api/penaflor?action=status` para verificar conectividad