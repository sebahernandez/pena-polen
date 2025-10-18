export const getLevelColor = (level: string): string => {
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

export const getConcentrationValue = (level: any): number => {
  if (level?.description?.includes('g/m³')) {
    const match = level.description.match(/(\d+)\s*g\/m³/);
    return match ? parseInt(match[1]) : 0;
  }
  // Fallback based on level names
  switch (level?.level) {
    case 'ALTOS':
    case 'ALTO':
      return 100;
    case 'MEDIOS':
    case 'MEDIO':
      return 50;
    case 'BAJOS':
    case 'BAJO':
      return 10;
    default:
      return 0;
  }
};
