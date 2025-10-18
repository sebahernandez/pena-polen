import { createClient } from '@supabase/supabase-js';
import type { PollenData } from './polenes';
import type { 
  Database, 
  SupabaseClient, 
  PollenRecordInsert, 
  PollenLevelInsert, 
  PollenForecastInsert,
} from '../types/supabase';

// Configuracion de Supabase
const supabaseUrl = process.env.PUBLIC_SUPABASE_URL || import.meta.env?.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.PUBLIC_SUPABASE_ANON_KEY || import.meta.env?.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Variables de entorno de Supabase no configuradas. Asegúrate de definir PUBLIC_SUPABASE_URL y PUBLIC_SUPABASE_ANON_KEY');
}

// Crear cliente de Supabase solo si las variables están configuradas
export const supabase: SupabaseClient | null = (supabaseUrl && supabaseAnonKey) ? 
  createClient<Database>(supabaseUrl, supabaseAnonKey) : 
  null;

// All types are now imported from ../types/supabase

// Function to clean test data
export async function cleanTestData(): Promise<boolean> {
  if (!supabase) {
    console.error('Cliente de Supabase no disponible');
    return false;
  }

  try {
    console.log('Limpiando datos de prueba...');
    
    // Delete test records by checking the date field for "Verificación"
    const { error } = await supabase
      .from('pollen_records')
      .delete()
      .ilike('date', '%Verificación%');

    if (error) {
      console.error('Error al limpiar datos de prueba:', error);
      return false;
    }

    console.log('Datos de prueba eliminados correctamente');
    return true;
  } catch (error) {
    console.error('Error inesperado al limpiar datos:', error);
    return false;
  }
}

// Funciones para manejar datos de polen
export class SupabasePollenService {
  
  /**
   * Guarda los datos de polen en la base de datos
   */
  static async savePollenData(pollenData: PollenData): Promise<number | null> {
    if (!supabase) {
      console.error('Cliente de Supabase no disponible');
      return null;
    }

    // Validate that we're only saving Santiago data
    if (pollenData.city !== 'Santiago') {
      console.warn(`Solo se permite guardar datos de Santiago. Se recibió: ${pollenData.city}`);
      return null;
    }
    
    try {
      console.log('Guardando datos de polen en Supabase...');
      
      // Insertar el registro principal de polen
      const { data: pollenRecord, error: pollenError } = await supabase!
        .from('pollen_records')
        .insert({
          city: pollenData.city,
          date: pollenData.date,
          period: pollenData.date,
        } as PollenRecordInsert)
        .select()
        .single();

      if (pollenError) {
        console.error('Error al guardar registro de polen:', pollenError);
        return null;
      }

      const pollenRecordId = pollenRecord.id;
      console.log(`Registro de polen guardado con ID: ${pollenRecordId}`);

      // Guardar los niveles de polen
      if (pollenData.levels.length > 0) {
        const pollenLevels = pollenData.levels.map(level => ({
          pollen_record_id: pollenRecordId,
          type: level.type,
          level: level.level,
          description: level.description
        }));

        const { error: levelsError } = await supabase!
          .from('pollen_levels')
          .insert(pollenLevels as PollenLevelInsert[]);

        if (levelsError) {
          console.error('Error al guardar niveles de polen:', levelsError);
        } else {
          console.log(`${pollenLevels.length} niveles de polen guardados`);
        }
      }

      // Guardar el pronóstico si existe
      if (pollenData.forecast) {
        const { error: forecastError } = await supabase!
          .from('pollen_forecasts')
          .insert({
            pollen_record_id: pollenRecordId,
            forecast_text: pollenData.forecast
          } as PollenForecastInsert);

        if (forecastError) {
          console.error('Error al guardar pronóstico:', forecastError);
        } else {
          console.log('Pronóstico guardado');
        }
      }

      return pollenRecordId;

    } catch (error) {
      console.error('Error general al guardar en Supabase:', error);
      return null;
    }
  }

  /**
   * Obtiene el último registro de polen
   */
  static async getLatestPollenData(): Promise<PollenData | null> {
    if (!supabase) {
      console.error('Cliente de Supabase no disponible');
      return null;
    }
    
    try {
      const { data: pollenRecord, error: pollenError } = await supabase!
        .from('pollen_records')
        .select(`
          *,
          pollen_levels(*),
          pollen_forecasts(*)
        `)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (pollenError) {
        console.error('Error al obtener datos de polen:', pollenError);
        return null;
      }

      // Convertir a formato PollenData
      const pollenData: PollenData = {
        city: pollenRecord.city,
        date: pollenRecord.date,
        levels: pollenRecord.pollen_levels.map((level: any) => ({
          type: level.type,
          level: level.level,
          description: level.description
        })),
        forecast: pollenRecord.pollen_forecasts?.[0]?.forecast_text || ''
      };

      return pollenData;

    } catch (error) {
      console.error('Error al obtener datos de polen:', error);
      return null;
    }
  }

  /**
   * Obtiene todos los registros de polen de una ciudad
   */
  static async getPollenDataByCity(city: string, limit: number = 10): Promise<PollenData[]> {
    if (!supabase) {
      console.error('Cliente de Supabase no disponible');
      return [];
    }
    
    try {
      const { data: pollenRecords, error } = await supabase!
        .from('pollen_records')
        .select(`
          *,
          pollen_levels(*),
          pollen_forecasts(*)
        `)
        .eq('city', city)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Error al obtener datos por ciudad:', error);
        return [];
      }

      return pollenRecords.map(record => ({
        city: record.city,
        date: record.date,
        levels: record.pollen_levels.map((level: any) => ({
          type: level.type,
          level: level.level,
          description: level.description
        })),
        forecast: record.pollen_forecasts?.[0]?.forecast_text || ''
      }));

    } catch (error) {
      console.error('Error al obtener datos por ciudad:', error);
      return [];
    }
  }

  /**
   * Obtiene registros de polen en un rango de fechas
   */
  static async getPollenDataByDateRange(startDate: string, endDate: string): Promise<PollenData[]> {
    if (!supabase) {
      console.error('Cliente de Supabase no disponible');
      return [];
    }
    
    try {
      const { data: pollenRecords, error } = await supabase!
        .from('pollen_records')
        .select(`
          *,
          pollen_levels(*),
          pollen_forecasts(*)
        `)
        .gte('created_at', startDate)
        .lte('created_at', endDate)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error al obtener datos por rango de fechas:', error);
        return [];
      }

      return pollenRecords.map(record => ({
        city: record.city,
        date: record.date,
        levels: record.pollen_levels.map((level: any) => ({
          type: level.type,
          level: level.level,
          description: level.description
        })),
        forecast: record.pollen_forecasts?.[0]?.forecast_text || ''
      }));

    } catch (error) {
      console.error('Error al obtener datos por rango de fechas:', error);
      return [];
    }
  }

  /**
   * Elimina registros antiguos (limpieza de base de datos)
   */
  static async cleanOldRecords(daysToKeep: number = 30): Promise<void> {
    if (!supabase) {
      console.error('Cliente de Supabase no disponible');
      return;
    }
    
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);
      
      const { error } = await supabase!
        .from('pollen_records')
        .delete()
        .lt('created_at', cutoffDate.toISOString());

      if (error) {
        console.error('Error al limpiar registros antiguos:', error);
      } else {
        console.log(`Registros anteriores a ${cutoffDate.toLocaleDateString()} eliminados`);
      }

    } catch (error) {
      console.error('L Error al limpiar registros:', error);
    }
  }

  /**
   * Verifica la conexión con Supabase
   */
  static async testConnection(): Promise<boolean> {
    try {
      if (!supabase) {
        console.warn('Cliente de Supabase no está configurado');
        return false;
      }

      const { data, error } = await supabase!
        .from('pollen_records')
        .select('count', { count: 'exact', head: true });

      if (error) {
        console.error('Error de conexión con Supabase:', error);
        return false;
      }

      console.log('Conexión con Supabase exitosa');
      return true;

    } catch (error) {
      console.error('L Error de conexión:', error);
      return false;
    }
  }
}

/**
 * Specialized function to save only Santiago pollen data
 */
export async function saveSantiagoPollenData(pollenData: PollenData): Promise<number | null> {
  // Check if Supabase is configured
  if (!supabase) {
    console.warn('Supabase no está configurado - no se pueden guardar datos');
    return null;
  }

  // Validate that we're only saving Santiago data
  if (pollenData.city !== 'Santiago') {
    console.warn(`Solo se permite guardar datos de Santiago. Se recibió: ${pollenData.city}`);
    return null;
  }
  
  try {
    console.log('Guardando datos de polen de Santiago en Supabase...');
    
    // Check if we already have data for this date to avoid duplicates
    const { data: existingRecord } = await supabase
      .from('pollen_records')
      .select('id')
      .eq('city', 'Santiago')
      .eq('date', pollenData.date)
      .single();
    
    if (existingRecord) {
      console.log(`Ya existe un registro para Santiago en la fecha: ${pollenData.date}`);
      return existingRecord.id;
    }
    
    // Insert the main pollen record for Santiago only
    const { data: pollenRecord, error: pollenError } = await supabase
      .from('pollen_records')
      .insert({
        city: 'Santiago',
        date: pollenData.date,
        period: pollenData.date,
      } as PollenRecordInsert)
      .select()
      .single();

    if (pollenError) {
      console.error('Error al guardar registro de polen de Santiago:', pollenError);
      return null;
    }

    const pollenRecordId = pollenRecord.id;
    console.log(`Registro de polen de Santiago guardado con ID: ${pollenRecordId}`);

    // Save Santiago pollen levels
    if (pollenData.levels.length > 0) {
      const pollenLevels = pollenData.levels.map(level => ({
        pollen_record_id: pollenRecordId,
        type: level.type,
        level: level.level,
        description: level.description
      }));

      const { error: levelsError } = await supabase
        .from('pollen_levels')
        .insert(pollenLevels as PollenLevelInsert[]);

      if (levelsError) {
        console.error('Error al guardar niveles de polen de Santiago:', levelsError);
      } else {
        console.log(`${pollenLevels.length} niveles de polen de Santiago guardados`);
      }
    }

    // Save Santiago forecast if exists
    if (pollenData.forecast) {
      const { error: forecastError } = await supabase
        .from('pollen_forecasts')
        .insert({
          pollen_record_id: pollenRecordId,
          forecast_text: pollenData.forecast
        });

      if (forecastError) {
        console.error('Error al guardar pronóstico de Santiago:', forecastError);
      } else {
        console.log('Pronóstico de Santiago guardado');
      }
    }

    return pollenRecordId;

  } catch (error) {
    console.error('Error general al guardar datos de Santiago en Supabase:', error);
    return null;
  }
}

// Exportar funciones individuales para facilidad de uso
export const savePollenData = SupabasePollenService.savePollenData;
export const getLatestPollenData = SupabasePollenService.getLatestPollenData;
export const getPollenDataByCity = SupabasePollenService.getPollenDataByCity;
export const getPollenDataByDateRange = SupabasePollenService.getPollenDataByDateRange;
export const testConnection = SupabasePollenService.testConnection;