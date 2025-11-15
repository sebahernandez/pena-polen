import { Calendar, MapPin, TrendingDown, TrendingUp, Minus } from 'lucide-react';
import type { HistoryRecord } from './types';
import { getLevelColor, getWeekRange } from './utils';

interface HistoryTableProps {
  records: HistoryRecord[];
  selectedIndex: number | null;
  onSelectRecord: (index: number) => void;
  needsScrolling: boolean;
}

const getLevelIcon = (level: string) => {
  switch (level) {
    case 'ALTOS':
    case 'ALTO':
      return <TrendingUp className="w-4 h-4" />;
    case 'MEDIOS':
    case 'MEDIO':
      return <Minus className="w-4 h-4" />;
    case 'BAJOS':
    case 'BAJO':
      return <TrendingDown className="w-4 h-4" />;
    default:
      return <Minus className="w-4 h-4" />;
  }
};

export default function HistoryTable({ 
  records, 
  selectedIndex, 
  onSelectRecord,
  needsScrolling 
}: HistoryTableProps) {
  return (
    <div className="overflow-x-auto">
      <div className={needsScrolling ? 'max-h-[600px] overflow-y-auto' : ''}>
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Fecha
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Ciudad
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Niveles de Polen
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Resumen
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {records.map((record, index) => {
              const isSelected = selectedIndex === index;
              return (
                <tr 
                  key={index} 
                  onClick={() => onSelectRecord(index)}
                  className={`
                    cursor-pointer transition-all duration-200
                    ${isSelected 
                      ? 'bg-indigo-100 dark:bg-indigo-900/30 border-l-4 border-l-indigo-600' 
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                    }
                  `}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white font-medium">
                      {getWeekRange(record.date)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {record.city === 'Santiago' ? 'Peñaflor' : record.city}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {record.levels.slice(0, 4).map((level, levelIndex) => (
                        <span
                          key={levelIndex}
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLevelColor(level.level)}`}
                        >
                          {getLevelIcon(level.level)}
                          <span className="ml-1">{level.type}</span>
                        </span>
                      ))}
                      {record.levels.length > 4 && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                          +{record.levels.length - 4} más
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    <div className="space-y-1">
                      <div>Total: {record.levels.length} tipos</div>
                      <div className="flex space-x-3 text-xs">
                        <span className="text-red-600">
                          Altos: {record.levels.filter(l => l.level === 'ALTOS' || l.level === 'ALTO').length}
                        </span>
                        <span className="text-yellow-600">
                          Medios: {record.levels.filter(l => l.level === 'MEDIOS' || l.level === 'MEDIO').length}
                        </span>
                        <span className="text-green-600">
                          Bajos: {record.levels.filter(l => l.level === 'BAJOS' || l.level === 'BAJO').length}
                        </span>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
