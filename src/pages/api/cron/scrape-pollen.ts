import type { APIRoute } from 'astro';
import { scrapeAndSavePollenData } from '../../../lib/polenes';

/**
 * Cron Job Endpoint para Vercel
 * Se ejecuta automáticamente según el schedule definido en vercel.json
 * 
 * Schedule ejemplos:
 * - Cada 6 horas: 0 asterisco/6 asterisco asterisco asterisco
 * - Cada 12 horas: 0 asterisco/12 asterisco asterisco asterisco
 * - Diariamente a las 9 AM UTC: 0 9 asterisco asterisco asterisco
 * - A las 8 AM, 2 PM y 8 PM UTC: 0 8,14,20 asterisco asterisco asterisco
 */
export const POST: APIRoute = async ({ request }) => {
  try {
    // Log inicial
    console.log('⏰ [CRON] Iniciando scraping automático de polen...');
    console.log(`⏰ [CRON] Hora: ${new Date().toISOString()}`);
    
    // Ejecutar scraping y guardado
    const pollenData = await scrapeAndSavePollenData();
    
    if (!pollenData) {
      console.error('❌ [CRON] Error: No se obtuvieron datos de polen');
      return new Response(
        JSON.stringify({
          success: false,
          message: 'No se pudieron obtener datos de polen',
          timestamp: new Date().toISOString(),
          cron: true
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    console.log('✅ [CRON] Scraping completado exitosamente');
    console.log(`✅ [CRON] Registros de polen: ${pollenData.levels.length}`);
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Scraping cron completado exitosamente',
        data: {
          city: pollenData.city,
          date: pollenData.date,
          levelsCount: pollenData.levels.length,
          levels: pollenData.levels,
          forecastLength: pollenData.forecast?.length || 0
        },
        timestamp: new Date().toISOString(),
        cron: true
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('❌ [CRON] Error en cron job:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Error al ejecutar el cron job de scraping',
        error: error instanceof Error ? error.message : 'Error desconocido',
        timestamp: new Date().toISOString(),
        cron: true
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
};
