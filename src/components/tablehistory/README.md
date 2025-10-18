# TableHistory Component - Arquitectura Refactorizada

## 📁 Estructura de Archivos

```
src/components/TableHistory/
├── index.tsx                   # Componente principal (orquestador)
├── types.ts                    # Definiciones de tipos TypeScript
├── hooks.ts                    # Custom hooks para lógica de negocio
├── utils.ts                    # Funciones utilitarias
├── SummaryCards.tsx            # Tarjetas de resumen de concentraciones
├── PollenChart.tsx             # Gráfico de barras con Recharts
├── TableFilters.tsx            # Controles de filtrado
├── PaginationControls.tsx      # Controles de paginación
└── HistoryTable.tsx            # Tabla de registros históricos
```

## 🏗️ Arquitectura

### Separación de Responsabilidades

#### **1. types.ts** - Tipos y Contratos
- ✅ Definiciones de interfaces
- ✅ Tipos compartidos entre componentes
- ✅ Contratos de API

```typescript
export interface HistoryRecord { ... }
export interface FilterState { ... }
export interface PaginationState { ... }
```

#### **2. utils.ts** - Funciones Utilitarias Puras
- ✅ `getLevelColor()` - Mapeo de niveles a colores
- ✅ `getConcentrationValue()` - Extracción de concentraciones
- ✅ Sin side effects
- ✅ Fácil de testear

```typescript
export const getLevelColor = (level: string): string => { ... }
export const getConcentrationValue = (level: any): number => { ... }
```

#### **3. hooks.ts** - Lógica de Negocio
Custom hooks reutilizables:

**`useHistoryData(selectedCity)`**
- Fetching de datos desde la API
- Manejo de loading y error states
- Auto-refresh con useEffect

**`useFilteredData(historyData, filters, limit)`**
- Aplicación de filtros
- Lógica de búsqueda
- Retorna datos filtrados

**`usePagination(filteredRecords, pagination)`**
- Cálculos de paginación
- Slice de datos por página
- Determinación de scrolling

#### **4. Componentes de Presentación**

**SummaryCards.tsx**
- Tarjetas de resumen (4 cards)
- Props: `selectedRecord`
- Presentacional puro

**PollenChart.tsx**
- Gráfico de barras Recharts
- Props: `selectedRecord`
- Configuración de tooltip personalizado

**TableFilters.tsx**
- 4 filtros: fecha, nivel, tipo, registros por página
- Props: `filters`, `onFilterChange`, etc.
- Botón de limpiar filtros

**PaginationControls.tsx**
- Controles de paginación (◀ 1 2 3 ▶)
- Props: `currentPage`, `totalPages`, `onPageChange`
- Lógica de números de página visible

**HistoryTable.tsx**
- Tabla HTML con registros
- Props: `records`, `selectedIndex`, `onSelectRecord`
- Sticky header

#### **5. index.tsx** - Orquestador
- Componente principal
- Maneja estados globales
- Coordina sub-componentes
- Gestiona efectos y side effects

## 🔄 Flujo de Datos

```
┌─────────────────┐
│   index.tsx     │ ← Orquestador principal
└────────┬────────┘
         │
         ├─→ useHistoryData() ───→ API
         │
         ├─→ useFilteredData() ──→ Filtrado
         │
         ├─→ usePagination() ────→ Paginación
         │
         ├─→ <SummaryCards />
         │
         ├─→ <PollenChart />
         │
         ├─→ <TableFilters />
         │
         ├─→ <PaginationControls />
         │
         └─→ <HistoryTable />
```

## ✨ Ventajas de Esta Arquitectura

### 1. **Mantenibilidad**
- Cada archivo tiene una responsabilidad clara
- Fácil encontrar y modificar funcionalidad específica
- Reduce cognitive load

### 2. **Reusabilidad**
- Hooks pueden usarse en otros componentes
- Utils son funciones puras reutilizables
- Componentes de UI son independientes

### 3. **Testabilidad**
```typescript
// Fácil de testear
describe('getLevelColor', () => {
  it('should return red for ALTO', () => {
    expect(getLevelColor('ALTO')).toContain('red');
  });
});

describe('useFilteredData', () => {
  it('should filter by date', () => {
    // Test hook logic
  });
});
```

### 4. **Escalabilidad**
- Agregar nuevos filtros: solo editar `TableFilters.tsx`
- Cambiar lógica de paginación: solo `PaginationControls.tsx`
- Nuevo tipo de gráfico: crear nuevo componente

### 5. **Type Safety**
- Tipos centralizados en `types.ts`
- TypeScript catch errors en compile time
- IntelliSense mejorado

### 6. **Performance**
- Componentes pequeños = re-renders más eficientes
- Hooks memorizables con `useMemo`/`useCallback`
- Splitting de código más granular

## 🔧 Cómo Usar

### Importar el componente principal:
```tsx
import TableHistory from '@/components/TableHistory';

// En tu página
<TableHistory />
```

### Extender funcionalidad:

**Agregar un nuevo filtro:**
1. Agregar tipo en `types.ts`
2. Agregar input en `TableFilters.tsx`
3. Actualizar lógica en `useFilteredData()`

**Cambiar estilo de nivel:**
1. Editar `getLevelColor()` en `utils.ts`
2. Cambios se propagan automáticamente

**Nuevo hook:**
```typescript
// En hooks.ts
export const useMyNewHook = (data) => {
  // Tu lógica
  return processedData;
};
```

## 📊 Comparación: Antes vs Después

### Antes (TableHistory.tsx monolítico)
- ❌ 600+ líneas en un archivo
- ❌ Difícil de mantener
- ❌ Difícil de testear
- ❌ Difícil de reutilizar partes
- ❌ Cognitive overload

### Después (Arquitectura modular)
- ✅ ~150 líneas máximo por archivo
- ✅ Responsabilidades claras
- ✅ Fácil de testear
- ✅ Componentes reutilizables
- ✅ Clean code principles

## 🚀 Próximos Pasos Posibles

1. **Agregar Tests**
   ```typescript
   // SummaryCards.test.tsx
   // hooks.test.ts
   // utils.test.ts
   ```

2. **Memoización**
   ```typescript
   const chartData = useMemo(() => 
     prepareChartData(selectedRecord), 
     [selectedRecord]
   );
   ```

3. **Context API** (si crece más)
   ```typescript
   // HistoryContext.tsx
   export const HistoryProvider = ({ children }) => {
     // State global
   };
   ```

4. **Lazy Loading**
   ```typescript
   const PollenChart = lazy(() => import('./PollenChart'));
   ```

## 📝 Notas de Migración

Para migrar del componente antiguo al nuevo:

1. ✅ Cambiar imports en páginas que usen `TableHistory`
   ```typescript
   // Antes
   import TableHistory from '@/components/TableHistory.tsx';
   
   // Después (automático si usas index.ts)
   import TableHistory from '@/components/TableHistory';
   ```

2. ✅ El componente mantiene la misma API externa
3. ✅ No requiere cambios en páginas que lo usan

## 🎯 Principios Aplicados

- ✅ **Single Responsibility Principle**: Cada archivo/función tiene una responsabilidad
- ✅ **DRY (Don't Repeat Yourself)**: Utils reutilizables
- ✅ **Separation of Concerns**: Lógica, presentación y datos separados
- ✅ **Composition over Inheritance**: Componentes componibles
- ✅ **Custom Hooks Pattern**: Lógica reutilizable
- ✅ **Container/Presentational Pattern**: index.tsx (container) + componentes (presentational)

## 📚 Referencias

- [React Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [Component Composition](https://react.dev/learn/passing-props-to-a-component)
- [TypeScript with React](https://react-typescript-cheatsheet.netlify.app/)
