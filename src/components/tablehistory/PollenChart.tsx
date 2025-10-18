import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { HistoryRecord } from './types';
import { getConcentrationValue } from './utils';

interface PollenChartProps {
  selectedRecord: HistoryRecord | null;
}

export default function PollenChart({ selectedRecord }: PollenChartProps) {
  if (!selectedRecord) return null;

  const chartData = [selectedRecord]
    .filter(record => !record.date.includes('Verificación'))
    .map((record) => {
      const totalArboles = record.levels.find(l => l.type === 'total de árboles');
      const platanoOriental = record.levels.find(l => l.type === 'plátano oriental');
      const pastos = record.levels.find(l => l.type === 'pastos');
      const malezas = record.levels.find(l => l.type === 'malezas');

      return {
        name: `Registro ${record.date}`,
        date: record.date,
        'Total Árboles': getConcentrationValue(totalArboles),
        'Plátano Oriental': getConcentrationValue(platanoOriental),
        'Pastos': getConcentrationValue(pastos),
        'Malezas': getConcentrationValue(malezas)
      };
    });

  if (chartData.length === 0) return null;

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Concentraciones de Polen (g/m³)
        <span className="ml-2 text-sm text-indigo-600 dark:text-indigo-400 font-normal">
          - {selectedRecord.date}
        </span>
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 12 }}
          />
          <YAxis />
          <Tooltip 
            labelFormatter={(label) => `${label}`}
            formatter={(value: number, name: string) => {
              if (value > 0) {
                return [`${value} g/m³`, name];
              }
              return null;
            }}
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                const activeData = payload.filter(entry => entry.value > 0);
                
                if (activeData.length === 0) return null;
                
                return (
                  <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg">
                    <p className="font-medium text-gray-900 dark:text-white mb-2">{label}</p>
                    {activeData.map((entry, index) => (
                      <div key={index} className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded mr-2" 
                          style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {entry.name}: <span className="font-semibold">{entry.value} g/m³</span>
                        </span>
                      </div>
                    ))}
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="Total Árboles" fill="#ef4444" name="Total Árboles" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Plátano Oriental" fill="#dc2626" name="Plátano Oriental" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Pastos" fill="#10b981" name="Pastos" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Malezas" fill="#f59e0b" name="Malezas" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
