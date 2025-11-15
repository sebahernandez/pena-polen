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

/**
 * Formatea una fecha en formato "DD-MM-YYYY" a formato legible
 * "Día de la semana, D de mes de YYYY"
 * Ej: "15-11-2025" → "viernes, 15 de noviembre de 2025"
 */
export const formatDateFromString = (dateString: string): string => {
  // Parsear la fecha en formato DD-MM-YYYY
  const parts = dateString.split('-');
  if (parts.length !== 3) return dateString;

  const day = parseInt(parts[0]);
  const month = parseInt(parts[1]) - 1; // Los meses en JS son 0-indexed
  const year = parseInt(parts[2]);

  const date = new Date(year, month, day);

  // Obtener el día de la semana en español
  const dayOfWeekFormatter = new Intl.DateTimeFormat('es-CL', { weekday: 'long' });
  const dayOfWeek = dayOfWeekFormatter.format(date);

  // Obtener el mes en español
  const monthFormatter = new Intl.DateTimeFormat('es-CL', { month: 'long' });
  const monthName = monthFormatter.format(date);

  // Capitalizar el primer carácter del día de la semana
  const capitalizedDayOfWeek = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);
  const capitalizedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);

  return `${capitalizedDayOfWeek}, ${day} de ${capitalizedMonth} de ${year}`;
};

/**
 * Calcula el rango de fechas de una semana epidemiológica
 * Retorna algo como: "Lunes, 6 de noviembre de 2025 al viernes, 12 de noviembre de 2025"
 */
export const getWeekRange = (dateString: string): string => {
  const parts = dateString.split('-');
  if (parts.length !== 3) return dateString;

  const day = parseInt(parts[0]);
  const month = parseInt(parts[1]) - 1;
  const year = parseInt(parts[2]);

  const currentDate = new Date(year, month, day);

  // Calcular el inicio de la semana (lunes)
  const dayOfWeek = currentDate.getDay();
  const diff = currentDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Ajustar para que lunes sea el inicio
  const startDate = new Date(year, month, diff);

  // Calcular el final de la semana (domingo)
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);

  // Formatear fechas
  const dayFormatter = new Intl.DateTimeFormat('es-CL', { weekday: 'long' });
  const dayMonthYearFormatter = new Intl.DateTimeFormat('es-CL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const startDayOfWeek = dayFormatter.format(startDate);
  const startFormatted = dayMonthYearFormatter.format(startDate);
  const endDayOfWeek = dayFormatter.format(endDate);
  const endFormatted = dayMonthYearFormatter.format(endDate);

  // Capitalizar primer carácter
  const capitalizeFirst = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  return `${capitalizeFirst(startDayOfWeek)}, ${startFormatted} al ${capitalizeFirst(endDayOfWeek)}, ${endFormatted}`;
};
