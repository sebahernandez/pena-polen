import type { FilterState, PaginationState } from './types';

interface TableFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  recordsPerPage: number;
  onRecordsPerPageChange: (value: number) => void;
  filteredCount: number;
  displayedCount: number;
}

export default function TableFilters({
  filters,
  onFilterChange,
  recordsPerPage,
  onRecordsPerPageChange,
  filteredCount,
  displayedCount
}: TableFiltersProps) {
  const hasActiveFilters = filters.searchDate || filters.filterLevel !== 'all' || filters.filterPollenType !== 'all';

  const clearFilters = () => {
    onFilterChange({
      searchDate: '',
      filterLevel: 'all',
      filterPollenType: 'all'
    });
  };

  return (
    <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search by Date */}
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
            Buscar por fecha
          </label>
          <input
            type="text"
            placeholder="Ej: octubre, 15-21"
            value={filters.searchDate}
            onChange={(e) => onFilterChange({ ...filters, searchDate: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Filter by Level */}
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
            Nivel de polen
          </label>
          <select
            value={filters.filterLevel}
            onChange={(e) => onFilterChange({ ...filters, filterLevel: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Todos los niveles</option>
            <option value="alto">Altos</option>
            <option value="medio">Medios</option>
            <option value="bajo">Bajos</option>
          </select>
        </div>

        {/* Filter by Pollen Type */}
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tipo de polen
          </label>
          <select
            value={filters.filterPollenType}
            onChange={(e) => onFilterChange({ ...filters, filterPollenType: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Todos los tipos</option>
            <option value="árboles">Total de Árboles</option>
            <option value="plátano">Plátano Oriental</option>
            <option value="pastos">Pastos</option>
            <option value="malezas">Malezas</option>
          </select>
        </div>

        {/* Records per Page */}
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
            Registros por página
          </label>
          <select
            value={recordsPerPage}
            onChange={(e) => onRecordsPerPageChange(Number(e.target.value))}
            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value={5}>5 registros</option>
            <option value={10}>10 registros</option>
            <option value={20}>20 registros</option>
            <option value={50}>50 registros</option>
          </select>
        </div>
      </div>

      {/* Filter Info and Clear Button */}
      {hasActiveFilters && (
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-gray-600 dark:text-gray-400">
            Mostrando {filteredCount} registros filtrados
          </span>
          <button
            onClick={clearFilters}
            className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 font-medium"
          >
            Limpiar filtros
          </button>
        </div>
      )}
    </div>
  );
}
