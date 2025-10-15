# Sistema de Notificaciones de Polen

## 📋 Descripción General

El sistema de notificaciones muestra alertas en tiempo real cuando se actualizan los niveles de polen en la aplicación. Las notificaciones aparecen en un dropdown en el navbar y se guardan en el navegador usando localStorage.

## 🎯 Características

### 1. **Notificación Automática**
- Se crea una notificación automáticamente cuando hay nuevos datos de polen
- Verifica cada 30 segundos si hay actualizaciones
- Previene notificaciones duplicadas

### 2. **Badge Visual**
- Punto animado en el ícono de campana cuando hay notificaciones sin leer
- Se oculta automáticamente cuando todas están leídas

### 3. **Dropdown Interactivo**
- Lista de notificaciones con diseño moderno
- Muestra los niveles de polen (ALTOS, MEDIOS, BAJOS) con colores
- Tiempo relativo ("Hace 5 min", "Hace 2h", etc.)
- Botón para marcar todas como leídas

### 4. **Persistencia de Datos**
- Las notificaciones se guardan en localStorage
- Se mantienen hasta 10 notificaciones como máximo
- Persisten entre sesiones del navegador

## 🚀 Cómo se Generan las Notificaciones

### Método 1: Automático (Sistema de Polling)

El navbar verifica automáticamente cada 30 segundos si hay nuevos datos:

```javascript
// En Header.astro
setInterval(checkForUpdates, 30000); // 30 segundos
```

Cuando detecta nuevos datos en `/api/penaflor?action=latest`, crea una notificación automáticamente.

### Método 2: Ejecutar Scraping Manualmente

#### Opción A: Desde Terminal
```bash
# Scraping + guardar en DB
npm run scrape:save

# Solo scraping (sin guardar)
npm run scrape
```

#### Opción B: Llamada a API
```bash
# POST request al endpoint de scraping
curl -X POST http://localhost:4321/api/scrape
```

#### Opción C: Desde el Navegador
```javascript
// En la consola del navegador
fetch('/api/scrape', { method: 'POST' })
  .then(r => r.json())
  .then(console.log);
```

## 📦 Estructura de una Notificación

```javascript
{
  id: 1697123456789,              // Timestamp único
  recordId: 5,                     // ID del registro en la DB
  title: "¡Niveles de polen actualizados!",
  message: "Nuevos datos disponibles para Santiago",
  timestamp: 1697123456789,        // Cuando se creó
  read: false,                     // Estado de lectura
  levels: [                        // Primeros 3 niveles
    {
      type: "total de árboles",
      level: "ALTOS",
      concentration: 154
    },
    // ... más niveles
  ]
}
```

## 🎨 Estados Visuales

### Notificación No Leída
- Fondo color indigo suave
- Punto azul a la derecha del título
- Badge animado en el ícono de campana

### Notificación Leída
- Fondo blanco/gris según tema
- Sin punto indicador
- Sin badge cuando todas están leídas

### Niveles de Polen (Colores)
- **ALTOS**: Rojo 🔴
- **MEDIOS**: Amarillo 🟡
- **BAJOS**: Verde 🟢

## 🔧 Personalización

### Cambiar Intervalo de Verificación

Edita `src/components/Header.astro`:

```javascript
// Cambiar de 30 segundos a otro intervalo
setInterval(checkForUpdates, 60000); // 60 segundos (1 minuto)
```

### Cambiar Límite de Notificaciones

```javascript
// Mantener solo las últimas 10 notificaciones
if (notifications.length > 10) {  // Cambiar este número
  notifications.pop();
}
```

### Modificar Información Mostrada

```javascript
// Mostrar más o menos niveles de polen
levels: data.data.levels?.slice(0, 3) || [] // Cambiar el 3 por el número deseado
```

## 🧪 Probar el Sistema

### 1. Generar una Notificación de Prueba

```javascript
// En la consola del navegador
const testNotification = {
  id: Date.now(),
  recordId: 999,
  title: '¡Prueba de notificación!',
  message: 'Esta es una notificación de prueba',
  timestamp: Date.now(),
  read: false,
  levels: [
    { type: 'Prueba', level: 'ALTOS', concentration: 200 }
  ]
};

const notifications = JSON.parse(localStorage.getItem('pollen-notifications') || '[]');
notifications.unshift(testNotification);
localStorage.setItem('pollen-notifications', JSON.stringify(notifications));
location.reload();
```

### 2. Limpiar Todas las Notificaciones

```javascript
// En la consola del navegador
localStorage.removeItem('pollen-notifications');
localStorage.removeItem('last-pollen-check');
location.reload();
```

### 3. Ver Notificaciones Actuales

```javascript
// En la consola del navegador
console.log(JSON.parse(localStorage.getItem('pollen-notifications') || '[]'));
```

## 📊 Flujo de Notificaciones

```
┌─────────────────────────────────────────────────────────────┐
│                 1. SCRAPING SE EJECUTA                       │
│         (Manual o automático via npm run scrape:save)        │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│          2. DATOS SE GUARDAN EN SUPABASE                     │
│                (tabla pollen_records)                        │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│       3. FRONTEND VERIFICA ACTUALIZACIONES                   │
│         (checkForUpdates cada 30 segundos)                   │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│       4. DETECTA NUEVO REGISTRO EN /api/penaflor             │
│           (compara con last-pollen-check)                    │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│       5. CREA NOTIFICACIÓN EN LOCALSTORAGE                   │
│         (pollen-notifications array)                         │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│        6. MUESTRA BADGE Y ACTUALIZA DROPDOWN                 │
│            (renderNotifications())                           │
└─────────────────────────────────────────────────────────────┘
```

## 🐛 Troubleshooting

### Las notificaciones no aparecen

1. Verifica que el scraping guardó datos en la DB:
   ```bash
   npm run scrape:save
   ```

2. Verifica la API:
   ```bash
   curl http://localhost:4321/api/penaflor?action=latest
   ```

3. Revisa la consola del navegador para errores

### El badge no desaparece

1. Haz clic en "Marcar todas como leídas"
2. O limpia localStorage:
   ```javascript
   localStorage.removeItem('pollen-notifications');
   ```

### No se actualiza automáticamente

1. Verifica que el intervalo esté corriendo:
   ```javascript
   // En la consola del navegador
   console.log('Intervalo activo:', window.setInterval);
   ```

2. Fuerza una verificación manual:
   ```javascript
   // Recargar la página
   location.reload();
   ```

## 📝 Notas Importantes

- Las notificaciones son solo del lado del cliente (no push notifications)
- Se requiere que la página esté abierta para recibir actualizaciones
- Los datos persisten en localStorage del navegador
- Cada navegador/dispositivo tiene su propio set de notificaciones
- Compatible con modo claro y oscuro

## 🔮 Mejoras Futuras Sugeridas

1. **Push Notifications**: Implementar notificaciones del navegador
2. **WebSockets**: Actualizaciones en tiempo real sin polling
3. **Filtros**: Permitir filtrar por tipo de polen o nivel
4. **Sonidos**: Agregar sonido de notificación
5. **Preferencias**: Permitir al usuario configurar frecuencia de checks
