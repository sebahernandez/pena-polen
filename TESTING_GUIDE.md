# 🧪 Testing del Sistema de Notificaciones

## Pasos para Probar

### 1️⃣ Asegúrate de que el servidor esté corriendo
```bash
npm run dev
```
El servidor debería estar en `http://localhost:4322/` (o el puerto que muestre)

---

### 2️⃣ Abrir la aplicación en el navegador
```
http://localhost:4322/
```

---

### 3️⃣ Generar una notificación ejecutando el scraper

**Opción A: Desde la terminal (recomendado)**
```bash
npm run scrape:save
```

**Opción B: Desde la consola del navegador**
```javascript
fetch('/api/scrape', { method: 'POST' })
  .then(r => r.json())
  .then(data => {
    console.log('✅ Scraping completado:', data);
    console.log('🔄 Espera 30 segundos para ver la notificación...');
  });
```

**Opción C: Usando curl**
```bash
curl -X POST http://localhost:4322/api/scrape
```

---

### 4️⃣ Verificar la notificación

Después de ejecutar el scraper, espera máximo 30 segundos y deberías ver:

1. ✅ **Badge animado** en el ícono de campana 🔔 (punto azul pulsante)
2. ✅ Click en la campana abre el dropdown
3. ✅ Notificación muestra:
   - Título: "¡Niveles de polen actualizados!"
   - Mensaje con la ciudad
   - Badges de niveles (ALTOS/MEDIOS/BAJOS)
   - Tiempo relativo ("Ahora mismo")

---

### 5️⃣ Crear notificación de prueba manual

Si quieres probar sin ejecutar el scraper real:

```javascript
// Pega esto en la consola del navegador
const testNotification = {
  id: Date.now(),
  recordId: 999,
  title: '🧪 Notificación de Prueba',
  message: 'Esta es una notificación de prueba del sistema',
  timestamp: Date.now(),
  read: false,
  levels: [
    { type: 'Árboles totales', level: 'ALTOS', concentration: 200 },
    { type: 'Plátano oriental', level: 'MEDIOS', concentration: 75 },
    { type: 'Pastos', level: 'BAJOS', concentration: 5 }
  ]
};

const notifications = JSON.parse(localStorage.getItem('pollen-notifications') || '[]');
notifications.unshift(testNotification);
localStorage.setItem('pollen-notifications', JSON.stringify(notifications));

// Actualizar la página
location.reload();
```

---

### 6️⃣ Probar funcionalidades

#### Marcar como leída
- Click en "Marcar todas como leídas"
- El badge debería desaparecer
- Las notificaciones pierden el punto azul

#### Múltiples notificaciones
```javascript
// Crear 5 notificaciones de prueba
for (let i = 0; i < 5; i++) {
  const notif = {
    id: Date.now() + i,
    recordId: 1000 + i,
    title: `Notificación de prueba ${i + 1}`,
    message: `Datos de prueba ${i + 1}`,
    timestamp: Date.now() - (i * 3600000), // 1 hora de diferencia cada una
    read: false,
    levels: [
      { type: 'Test', level: i % 2 === 0 ? 'ALTOS' : 'MEDIOS', concentration: 100 }
    ]
  };
  
  const notifs = JSON.parse(localStorage.getItem('pollen-notifications') || '[]');
  notifs.unshift(notif);
  localStorage.setItem('pollen-notifications', JSON.stringify(notifs));
}

location.reload();
```

#### Verificar tiempos relativos
Las notificaciones deberían mostrar:
- "Ahora mismo" (< 1 min)
- "Hace 5 min" (5 minutos)
- "Hace 2h" (2 horas)
- "Ayer" (24-48 horas)
- "Hace 3 días" (> 48 horas)

---

### 7️⃣ Inspeccionar localStorage

```javascript
// Ver todas las notificaciones guardadas
console.table(JSON.parse(localStorage.getItem('pollen-notifications') || '[]'));

// Ver último check
console.log('Último check:', localStorage.getItem('last-pollen-check'));
```

---

### 8️⃣ Limpiar todo

```javascript
// Limpiar notificaciones
localStorage.removeItem('pollen-notifications');
localStorage.removeItem('last-pollen-check');
location.reload();
```

---

## 🎯 Checklist de Testing

- [ ] El servidor corre sin errores
- [ ] La página carga correctamente
- [ ] El ícono de campana está visible en el navbar
- [ ] Ejecutar `npm run scrape:save` funciona
- [ ] Aparece el badge animado después de ~30 segundos
- [ ] Click en campana abre el dropdown
- [ ] La notificación muestra datos correctos
- [ ] Los badges de niveles tienen colores correctos (ALTOS=rojo, MEDIOS=amarillo, BAJOS=verde)
- [ ] El tiempo relativo se muestra correctamente
- [ ] "Marcar todas como leídas" funciona
- [ ] El badge desaparece cuando todas están leídas
- [ ] El dropdown se cierra al hacer click fuera
- [ ] Funciona en modo claro y oscuro
- [ ] Es responsive (prueba en móvil)

---

## 🐛 Solución de Problemas

### No aparece el badge
1. Verificar en consola: `localStorage.getItem('pollen-notifications')`
2. Verificar que hayan pasado 30 segundos desde el scraping
3. Hacer refresh de la página
4. Revisar consola del navegador por errores

### La notificación está vacía
1. Verificar que el scraping guardó datos: `GET http://localhost:4322/api/penaflor?action=latest`
2. Ver respuesta en consola
3. Si no hay datos, ejecutar `npm run scrape:save` nuevamente

### El dropdown no se cierra
1. Hacer click fuera del dropdown
2. Refresh de página
3. Verificar consola por errores JavaScript

### Los colores no se ven bien
1. Alternar entre modo claro/oscuro
2. Verificar que Tailwind esté cargando
3. Hacer hard refresh (Cmd+Shift+R o Ctrl+Shift+R)

---

## 📸 Resultado Esperado

✅ **Vista inicial**: Campana sin badge  
✅ **Después del scraping**: Campana con punto azul animado  
✅ **Click en campana**: Dropdown con notificación  
✅ **Notificación**: Título, mensaje, badges de colores, tiempo  
✅ **Después de marcar leída**: Sin badge, notificación sin punto azul  

---

**¡Listo! El sistema está funcionando correctamente si pasas todos los checks.** 🎉
