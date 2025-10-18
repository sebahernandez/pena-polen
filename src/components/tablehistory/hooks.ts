import { useState, useEffect } from 'react';
import type { HistoryRecord, ApiResponse, FilterState, PaginationState } from './types';

export const useHistoryData = (selectedCity: string) => {
  const [historyData, setHistoryData] = useState<HistoryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHistoryData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/history?city=${selectedCity}&limit=100`);
      if (!response.ok) {
        throw new Error('Error al obtener historial');
      }
      const result: ApiResponse = await response.json();
      if (result.success) {
        const filteredData = result.data
          .filter(record => !record.date.includes('Verificación'))
          .filter(record => record.levels.some(level => 
            ['total de árboles', 'plátano oriental', 'pastos', 'malezas'].includes(level.type)
          ));
        
        console.log(`📊 Total de registros históricos encontrados: ${filteredData.length}`);
        console.log(`📊 Total de registros en respuesta API: ${result.data.length}`);
        
        setHistoryData(filteredData);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistoryData();
  }, [selectedCity]);

  return { historyData, loading, error, refetch: fetchHistoryData };
};

export const useFilteredData = (
  historyData: HistoryRecord[],
  filters: FilterState,
  limit: number
) => {
  const displayedRecords = historyData.slice(0, limit);
  
  const filteredRecords = displayedRecords.filter(record => {
    if (filters.searchDate && !record.date.toLowerCase().includes(filters.searchDate.toLowerCase())) {
      return false;
    }
    
    if (filters.filterLevel !== 'all') {
      const hasLevel = record.levels.some(level => 
        level.level.toLowerCase().includes(filters.filterLevel.toLowerCase())
      );
      if (!hasLevel) return false;
    }
    
    if (filters.filterPollenType !== 'all') {
      const hasType = record.levels.some(level => 
        level.type.toLowerCase().includes(filters.filterPollenType.toLowerCase())
      );
      if (!hasType) return false;
    }
    
    return true;
  });

  return { displayedRecords, filteredRecords };
};

export const usePagination = (
  filteredRecords: HistoryRecord[],
  pagination: PaginationState
) => {
  const totalPages = Math.ceil(filteredRecords.length / pagination.recordsPerPage);
  const startIndex = (pagination.currentPage - 1) * pagination.recordsPerPage;
  const endIndex = startIndex + pagination.recordsPerPage;
  const paginatedRecords = filteredRecords.slice(startIndex, endIndex);
  const needsScrolling = paginatedRecords.length > 10;

  return {
    paginatedRecords,
    totalPages,
    startIndex,
    endIndex,
    needsScrolling
  };
};
