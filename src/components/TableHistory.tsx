import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { History, Calendar, MapPin, TrendingDown, TrendingUp, Minus, RefreshCw, Filter } from 'lucide-react';

interface PollenLevel {
  type: string;
  level: string;
  description?: string;
}

interface HistoryRecord {
  city: string;
  date: string;
  levels: PollenLevel[];
  forecast?: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: HistoryRecord[];
  meta: {
    total: number;
    city: string;
    limit: number;
    hasDateRange: boolean;
  };
}

export default function TableHistory() {
  const [historyData, setHistoryData] = useState<HistoryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState('Santiago');
  const [limit, setLimit] = useState(10);

  const fetchHistoryData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/history?city=${selectedCity}&limit=${limit}`);
      if (!response.ok) {
        throw new Error('Error al obtener historial');
      }
      const result: ApiResponse = await response.json();
      if (result.success) {
        // Filter out test data and get only the latest real record
        const filteredData = result.data
          .filter(record => !record.date.includes('Verificación'))
          .filter(record => record.levels.some(level => 
            ['total de árboles', 'plátano oriental', 'pastos', 'malezas'].includes(level.type)
          ));
        
        // If we have updated data, show only the latest one
        const latestData = filteredData.length > 0 ? [filteredData[0]] : [];
        setHistoryData(latestData);
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
  }, [selectedCity, limit]);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'ALTOS':
      case 'ALTO':
        return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-200';
      case 'MEDIOS':
      case 'MEDIO':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200';
      case 'BAJOS':
      case 'BAJO':
        return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-200';
    }
  };

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

  // Prepare chart data showing specific pollen types (filter out test data)
  const chartData = historyData
    .filter(record => !record.date.includes('Verificación')) // Filter out test data
    .map((record, index) => {
      // Get specific pollen types and their concentrations
      const totalArboles = record.levels.find(l => l.type === 'total de árboles');
      const platanoOriental = record.levels.find(l => l.type === 'plátano oriental');
      const pastos = record.levels.find(l => l.type === 'pastos');
      const malezas = record.levels.find(l => l.type === 'malezas');

      // Get concentration values or default to level-based values for visualization
      const getConcentrationValue = (level: any) => {
        if (level?.description?.includes('g/m³')) {
          const match = level.description.match(/(\d+)\s*g\/m³/);
          return match ? parseInt(match[1]) : 0;
        }
        // Fallback based on level names
        switch (level?.level) {
          case 'ALTOS': case 'ALTO': return 100;
          case 'MEDIOS': case 'MEDIO': return 50;
          case 'BAJOS': case 'BAJO': return 10;
          default: return 0;
        }
      };

      return {
        name: `Registro ${record.date}`,
        date: record.date,
        'Total Árboles': getConcentrationValue(totalArboles),
        'Plátano Oriental': getConcentrationValue(platanoOriental),
        'Pastos': getConcentrationValue(pastos),
        'Malezas': getConcentrationValue(malezas)
      };
    }).reverse();

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
          onClick={fetchHistoryData}
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
        {/* Data Summary - Filter out test data */}
      {historyData.filter(record => !record.date.includes('Verificación')).length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm font-medium text-red-600 dark:text-red-400">Total Árboles</p>
                <p className="text-2xl font-bold text-red-700 dark:text-red-300">
                  {historyData
                    .filter(record => !record.date.includes('Verificación'))
                    .reduce((sum, record) => {
                      const totalArboles = record.levels.find(l => l.type === 'total de árboles');
                      if (totalArboles?.description?.includes('g/m³')) {
                        const match = totalArboles.description.match(/(\d+)\s*g\/m³/);
                        return sum + (match ? parseInt(match[1]) : 0);
                      }
                      return sum;
                    }, 0)} g/m³
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-red-500" />
            </div>
            <div className="text-xs text-red-600 dark:text-red-400">
              Concentración promedio total
            </div>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm font-medium text-red-600 dark:text-red-400">Plátano Oriental</p>
                <p className="text-2xl font-bold text-red-700 dark:text-red-300">
                  {historyData
                    .filter(record => !record.date.includes('Verificación'))
                    .reduce((sum, record) => {
                      const platano = record.levels.find(l => l.type === 'plátano oriental');
                      if (platano?.description?.includes('g/m³')) {
                        const match = platano.description.match(/(\d+)\s*g\/m³/);
                        return sum + (match ? parseInt(match[1]) : 0);
                      }
                      return sum;
                    }, 0)} g/m³
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-red-500" />
            </div>
            <div className="text-xs text-red-600 dark:text-red-400">
              Nivel alto
            </div>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">Malezas</p>
                <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">
                  {historyData
                    .filter(record => !record.date.includes('Verificación'))
                    .reduce((sum, record) => {
                      const malezas = record.levels.find(l => l.type === 'malezas');
                      if (malezas?.description?.includes('g/m³')) {
                        const match = malezas.description.match(/(\d+)\s*g\/m³/);
                        return sum + (match ? parseInt(match[1]) : 0);
                      }
                      return sum;
                    }, 0)} g/m³
                </p>
              </div>
              <Minus className="w-8 h-8 text-yellow-500" />
            </div>
            <div className="text-xs text-yellow-600 dark:text-yellow-400">
              Nivel medio
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Pastos</p>
                <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                  {historyData
                    .filter(record => !record.date.includes('Verificación'))
                    .reduce((sum, record) => {
                      const pastos = record.levels.find(l => l.type === 'pastos');
                      if (pastos?.description?.includes('g/m³')) {
                        const match = pastos.description.match(/(\d+)\s*g\/m³/);
                        return sum + (match ? parseInt(match[1]) : 0);
                      }
                      return sum;
                    }, 0)} g/m³
                </p>
              </div>
              <TrendingDown className="w-8 h-8 text-green-500" />
            </div>
            <div className="text-xs text-green-600 dark:text-green-400">
              Nivel bajo
            </div>
          </div>
        </div>
      )}
      {/* Header and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">


        
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">


          <div className="flex items-center">
            <History className="w-6 h-6 mr-3 text-blue-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Historial
            </h2>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="Santiago">Peñaflor</option>
              </select>
            </div>
            
            <select
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value={5}>5 registros</option>
              <option value={10}>10 registros</option>
              <option value={20}>20 registros</option>
              <option value={50}>50 registros</option>
            </select>

            <button 
              onClick={fetchHistoryData}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Actualizar
            </button>
          </div>
        </div>

        {/* Trend Chart */}
        {chartData.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Concentraciones Actuales de Polen (g/m³)
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
                  formatter={(value: number, name: string) => [
                    `${value} g/m³`, 
                    name
                  ]}
                />
                <Bar dataKey="Total Árboles" fill="#ef4444" name="Total Árboles" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Plátano Oriental" fill="#dc2626" name="Plátano Oriental" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Pastos" fill="#10b981" name="Pastos" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Malezas" fill="#f59e0b" name="Malezas" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* History Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
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
              {historyData.map((record, index) => (
                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white font-medium">
                      {record.date}
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
                          +{record.levels.length - 4} m�s
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
              ))}
            </tbody>
          </table>
        </div>

        {historyData.length === 0 && (
          <div className="text-center py-12">
            <History className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No hay registros hist�ricos
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              No se encontraron datos para los filtros seleccionados.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}