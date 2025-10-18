import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  startIndex: number;
  endIndex: number;
  totalRecords: number;
}

export default function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
  startIndex,
  endIndex,
  totalRecords
}: PaginationControlsProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    return Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
      if (totalPages <= 5) {
        return i + 1;
      } else if (currentPage <= 3) {
        return i + 1;
      } else if (currentPage >= totalPages - 2) {
        return totalPages - 4 + i;
      } else {
        return currentPage - 2 + i;
      }
    });
  };

  return (
    <div className="mt-4 flex items-center justify-between">
      <div className="text-xs text-gray-600 dark:text-gray-400">
        Página {currentPage} de {totalPages} • Mostrando {startIndex + 1}-{Math.min(endIndex, totalRecords)} de {totalRecords}
      </div>
      
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className={`
            p-2 rounded-lg border transition-colors
            ${currentPage === 1
              ? 'border-gray-200 dark:border-gray-600 text-gray-400 dark:text-gray-600 cursor-not-allowed'
              : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
            }
          `}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Page Numbers */}
        <div className="flex gap-1">
          {getPageNumbers().map((pageNum, i) => (
            <button
              key={i}
              onClick={() => onPageChange(pageNum)}
              className={`
                px-3 py-1 text-xs rounded-lg border transition-colors
                ${currentPage === pageNum
                  ? 'bg-blue-500 border-blue-500 text-white'
                  : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                }
              `}
            >
              {pageNum}
            </button>
          ))}
        </div>

        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className={`
            p-2 rounded-lg border transition-colors
            ${currentPage === totalPages
              ? 'border-gray-200 dark:border-gray-600 text-gray-400 dark:text-gray-600 cursor-not-allowed'
              : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
            }
          `}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
