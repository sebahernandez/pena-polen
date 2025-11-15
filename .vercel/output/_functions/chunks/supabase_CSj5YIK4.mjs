import { createClient } from '@supabase/supabase-js';

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "PUBLIC_SUPABASE_ANON_KEY": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrdWd0bnBwamxqdWlka2hncmZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0MjIwNDIsImV4cCI6MjA3NDk5ODA0Mn0.0biHZcO38ih89I8OpYPpDW2sBihaPsgIGPNlFvi7Npg", "PUBLIC_SUPABASE_URL": "https://ukugtnppjljuidkhgrfl.supabase.co", "SITE": undefined, "SSR": true};
const supabaseUrl = process.env.PUBLIC_SUPABASE_URL || Object.assign(__vite_import_meta_env__, { _: process.env._ })?.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.PUBLIC_SUPABASE_ANON_KEY || Object.assign(__vite_import_meta_env__, { _: process.env._ })?.PUBLIC_SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Variables de entorno de Supabase no configuradas. Asegúrate de definir PUBLIC_SUPABASE_URL y PUBLIC_SUPABASE_ANON_KEY");
}
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;
class SupabasePollenService {
  /**
   * Guarda los datos de polen en la base de datos
   */
  static async savePollenData(pollenData) {
    if (!supabase) {
      console.error("Cliente de Supabase no disponible");
      return null;
    }
    if (pollenData.city !== "Santiago") {
      console.warn(`Solo se permite guardar datos de Santiago. Se recibió: ${pollenData.city}`);
      return null;
    }
    try {
      console.log("Guardando datos de polen en Supabase...");
      const { data: pollenRecord, error: pollenError } = await supabase.from("pollen_records").insert({
        city: pollenData.city,
        date: pollenData.date,
        period: pollenData.date
      }).select().single();
      if (pollenError) {
        console.error("Error al guardar registro de polen:", pollenError);
        return null;
      }
      const pollenRecordId = pollenRecord.id;
      console.log(`Registro de polen guardado con ID: ${pollenRecordId}`);
      if (pollenData.levels.length > 0) {
        const pollenLevels = pollenData.levels.map((level) => ({
          pollen_record_id: pollenRecordId,
          type: level.type,
          level: level.level,
          description: level.description
        }));
        const { error: levelsError } = await supabase.from("pollen_levels").insert(pollenLevels);
        if (levelsError) {
          console.error("Error al guardar niveles de polen:", levelsError);
        } else {
          console.log(`${pollenLevels.length} niveles de polen guardados`);
        }
      }
      if (pollenData.forecast) {
        const { error: forecastError } = await supabase.from("pollen_forecasts").insert({
          pollen_record_id: pollenRecordId,
          forecast_text: pollenData.forecast
        });
        if (forecastError) {
          console.error("Error al guardar pronóstico:", forecastError);
        } else {
          console.log("Pronóstico guardado");
        }
      }
      return pollenRecordId;
    } catch (error) {
      console.error("Error general al guardar en Supabase:", error);
      return null;
    }
  }
  /**
   * Obtiene el último registro de polen
   */
  static async getLatestPollenData() {
    if (!supabase) {
      console.error("Cliente de Supabase no disponible");
      return null;
    }
    try {
      const { data: pollenRecord, error: pollenError } = await supabase.from("pollen_records").select(`
          *,
          pollen_levels(*),
          pollen_forecasts(*)
        `).order("created_at", { ascending: false }).limit(1).single();
      if (pollenError) {
        console.error("Error al obtener datos de polen:", pollenError);
        return null;
      }
      const pollenData = {
        city: pollenRecord.city,
        date: pollenRecord.date,
        levels: pollenRecord.pollen_levels.map((level) => ({
          type: level.type,
          level: level.level,
          description: level.description
        })),
        forecast: pollenRecord.pollen_forecasts?.[0]?.forecast_text || ""
      };
      return pollenData;
    } catch (error) {
      console.error("Error al obtener datos de polen:", error);
      return null;
    }
  }
  /**
   * Obtiene todos los registros de polen de una ciudad
   */
  static async getPollenDataByCity(city, limit = 10) {
    if (!supabase) {
      console.error("Cliente de Supabase no disponible");
      return [];
    }
    try {
      const { data: pollenRecords, error } = await supabase.from("pollen_records").select(`
          *,
          pollen_levels(*),
          pollen_forecasts(*)
        `).eq("city", city).order("created_at", { ascending: false }).limit(limit);
      if (error) {
        console.error("Error al obtener datos por ciudad:", error);
        return [];
      }
      return pollenRecords.map((record) => ({
        city: record.city,
        date: record.date,
        levels: record.pollen_levels.map((level) => ({
          type: level.type,
          level: level.level,
          description: level.description
        })),
        forecast: record.pollen_forecasts?.[0]?.forecast_text || ""
      }));
    } catch (error) {
      console.error("Error al obtener datos por ciudad:", error);
      return [];
    }
  }
  /**
   * Obtiene registros de polen en un rango de fechas
   */
  static async getPollenDataByDateRange(startDate, endDate) {
    if (!supabase) {
      console.error("Cliente de Supabase no disponible");
      return [];
    }
    try {
      const { data: pollenRecords, error } = await supabase.from("pollen_records").select(`
          *,
          pollen_levels(*),
          pollen_forecasts(*)
        `).gte("created_at", startDate).lte("created_at", endDate).order("created_at", { ascending: false });
      if (error) {
        console.error("Error al obtener datos por rango de fechas:", error);
        return [];
      }
      return pollenRecords.map((record) => ({
        city: record.city,
        date: record.date,
        levels: record.pollen_levels.map((level) => ({
          type: level.type,
          level: level.level,
          description: level.description
        })),
        forecast: record.pollen_forecasts?.[0]?.forecast_text || ""
      }));
    } catch (error) {
      console.error("Error al obtener datos por rango de fechas:", error);
      return [];
    }
  }
  /**
   * Elimina registros antiguos (limpieza de base de datos)
   */
  static async cleanOldRecords(daysToKeep = 30) {
    if (!supabase) {
      console.error("Cliente de Supabase no disponible");
      return;
    }
    try {
      const cutoffDate = /* @__PURE__ */ new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);
      const { error } = await supabase.from("pollen_records").delete().lt("created_at", cutoffDate.toISOString());
      if (error) {
        console.error("Error al limpiar registros antiguos:", error);
      } else {
        console.log(`Registros anteriores a ${cutoffDate.toLocaleDateString()} eliminados`);
      }
    } catch (error) {
      console.error("L Error al limpiar registros:", error);
    }
  }
  /**
   * Verifica la conexión con Supabase
   */
  static async testConnection() {
    try {
      if (!supabase) {
        console.warn("Cliente de Supabase no está configurado");
        return false;
      }
      const { data, error } = await supabase.from("pollen_records").select("count", { count: "exact", head: true });
      if (error) {
        console.error("Error de conexión con Supabase:", error);
        return false;
      }
      console.log("Conexión con Supabase exitosa");
      return true;
    } catch (error) {
      console.error("L Error de conexión:", error);
      return false;
    }
  }
}
const getLatestPollenData = SupabasePollenService.getLatestPollenData;
const getPollenDataByCity = SupabasePollenService.getPollenDataByCity;
const getPollenDataByDateRange = SupabasePollenService.getPollenDataByDateRange;
const testConnection = SupabasePollenService.testConnection;

export { SupabasePollenService as S, getPollenDataByCity as a, getLatestPollenData as b, getPollenDataByDateRange as g, testConnection as t };
