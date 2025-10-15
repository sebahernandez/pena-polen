import type { APIRoute } from 'astro';
import { scrapeAndSavePollenData } from '../../lib/polenes';

/**
 * API endpoint para ejecutar el scraping de datos de polen
 * POST /api/scrape - Ejecuta el scraping y guarda en la base de datos
 */
export const POST: APIRoute = async () => {
  try {
    console.log('📡 API: Iniciando scraping de polen...');
    
    const pollenData = await scrapeAndSavePollenData();
    
    if (!pollenData) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'No se pudieron obtener datos de polen',
          data: null
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Scraping completado exitosamente',
        data: pollenData,
        timestamp: new Date().toISOString()
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  } catch (error) {
    console.error('❌ Error en API de scraping:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Error al ejecutar el scraping',
        error: error instanceof Error ? error.message : 'Error desconocido',
        data: null
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }
};

// Manejar preflight requests para CORS
export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
};
