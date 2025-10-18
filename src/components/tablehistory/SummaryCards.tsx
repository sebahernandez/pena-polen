import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { HistoryRecord } from './types';
import { getConcentrationValue } from './utils';

interface SummaryCardsProps {
  selectedRecord: HistoryRecord | null;
}

export default function SummaryCards({ selectedRecord }: SummaryCardsProps) {
  if (!selectedRecord || selectedRecord.date.includes('Verificación')) {
    return null;
  }

  const totalArboles = selectedRecord.levels.find(l => l.type === 'total de árboles');
  const platano = selectedRecord.levels.find(l => l.type === 'plátano oriental');
  const malezas = selectedRecord.levels.find(l => l.type === 'malezas');
  const pastos = selectedRecord.levels.find(l => l.type === 'pastos');

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm font-medium text-red-600 dark:text-red-400">Total Árboles</p>
            <p className="text-2xl font-bold text-red-700 dark:text-red-300">
              {getConcentrationValue(totalArboles)} g/m³
            </p>
          </div>
          <TrendingUp className="w-8 h-8 text-red-500" />
        </div>
        <div className="text-xs text-red-600 dark:text-red-400">
          Concentración total de árboles
        </div>
      </div>

      <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm font-medium text-red-600 dark:text-red-400">Plátano Oriental</p>
            <p className="text-2xl font-bold text-red-700 dark:text-red-300">
              {getConcentrationValue(platano)} g/m³
            </p>
          </div>
          <TrendingUp className="w-8 h-8 text-red-500" />
        </div>
        <div className="text-xs text-red-600 dark:text-red-400">
          Concentración plátano oriental
        </div>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">Malezas</p>
            <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">
              {getConcentrationValue(malezas)} g/m³
            </p>
          </div>
          <Minus className="w-8 h-8 text-yellow-500" />
        </div>
        <div className="text-xs text-yellow-600 dark:text-yellow-400">
          Concentración malezas
        </div>
      </div>

      <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm font-medium text-green-600 dark:text-green-400">Pastos</p>
            <p className="text-2xl font-bold text-green-700 dark:text-green-300">
              {getConcentrationValue(pastos)} g/m³
            </p>
          </div>
          <TrendingDown className="w-8 h-8 text-green-500" />
        </div>
        <div className="text-xs text-green-600 dark:text-green-400">
          Concentración pastos
        </div>
      </div>
    </div>
  );
}
