import { useState, useEffect } from 'react';
import { History, RefreshCw } from 'lucide-react';
import { useHistoryData, useFilteredData, usePagination } from './hooks';
import SummaryCards from './SummaryCards';
import PollenChart from './PollenChart';
import TableFilters from './TableFilters';
import PaginationControls from './PaginationControls';
import HistoryTable from './HistoryTable';
import type { FilterState } from './types';

export default function TableHistory() {
  const [selectedCity] = useState('Santiago');
  const [limit] = useState(50);
  const [selectedRecordIndex, setSelectedRecordIndex] = useState<number | null>(null);
  
  // Filter states
  const [filters, setFilters] = useState<FilterState>({
    searchDate: '',
    filterLevel: 'all',
    filterPollenType: 'all'
  });
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);

  // Custom hooks
  const { historyData, loading, error, refetch } = useHistoryData(selectedCity);
  const { displayedRecords, filteredRecords } = useFilteredData(historyData, filters, limit);
  const { paginatedRecords, totalPages, startIndex, endIndex, needsScrolling } = usePagination(
    filteredRecords,
    { currentPage, recordsPerPage }
  );

  // Selected record from original data
  const selectedRecord = selectedRecordIndex !== null ? historyData[selectedRecordIndex] : null;

  // Reset selection if out of bounds
  useEffect(() => {
    if (selectedRecordIndex !== null && selectedRecordIndex >= limit) {
      setSelectedRecordIndex(0);
    }
  }, [limit, selectedRecordIndex]);

  // Reset selection when filters change
  useEffect(() => {
    if (filteredRecords.length > 0 && (selectedRecordIndex === null || selectedRecordIndex >= filteredRecords.length)) {
      setSelectedRecordIndex(0);
    }
  }, [filters.searchDate, filters.filterLevel, filters.filterPollenType, filteredRecords.length, selectedRecordIndex]);

  // Reset to page 1 when filters or recordsPerPage change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters.searchDate, filters.filterLevel, filters.filterPollenType, recordsPerPage]);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-pulse">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex items-center text-red-500 mb-4">
          <History className="w-5 h-5 mr-2" />
          <h3 className="text-lg font-semibold">Error</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-300">{error}</p>
        <button 
          onClick={refetch}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <SummaryCards selectedRecord={selectedRecord} />
      
      {/* Info message when no record selected */}
      {!selectedRecord && historyData.length > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
          <div className="flex items-center text-blue-700 dark:text-blue-300">
            <History className="w-5 h-5 mr-2" />
            <p className="text-sm font-medium">
              Selecciona un registro en la tabla para ver sus concentraciones de polen
            </p>
          </div>
        </div>
      )}

      {/* Chart Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div className="flex items-center">
            <History className="w-6 h-6 mr-3 text-blue-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Historial
            </h2>
            {historyData.length > 0 && (
              <span className="ml-3 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-full">
                {historyData.length} {historyData.length === 1 ? 'registro' : 'registros'} total{historyData.length === 1 ? '' : 'es'}
              </span>
            )}
          </div>
        </div>

        <PollenChart selectedRecord={selectedRecord} />
      </div>

      {/* History Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <TableFilters
          filters={filters}
          onFilterChange={setFilters}
          recordsPerPage={recordsPerPage}
          onRecordsPerPageChange={setRecordsPerPage}
          filteredCount={filteredRecords.length}
          displayedCount={displayedRecords.length}
        />

        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          startIndex={startIndex}
          endIndex={endIndex}
          totalRecords={filteredRecords.length}
        />

        <div className="px-6 py-3 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <span className="font-medium">Click en una fila</span> para ver sus concentraciones de polen en el gráfico
            {selectedRecordIndex !== null && selectedRecordIndex < paginatedRecords.length && (
              <span className="ml-2 text-indigo-600 dark:text-indigo-400">
                • Registro {selectedRecordIndex + 1} de {paginatedRecords.length} seleccionado en esta página
              </span>
            )}
          </p>
        </div>

        <HistoryTable
          records={paginatedRecords}
          selectedIndex={selectedRecordIndex}
          onSelectRecord={setSelectedRecordIndex}
          needsScrolling={needsScrolling}
        />

        {paginatedRecords.length === 0 && filteredRecords.length === 0 && (
          <div className="text-center py-12">
            <History className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No hay registros que coincidan
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {displayedRecords.length > 0 
                ? 'Intenta ajustar los filtros para ver más resultados.'
                : 'No se encontraron datos históricos.'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
