import type { APIRoute } from 'astro';
import { scrapeAndSavePollenData } from '../../lib/polenes';

/**
 * API endpoint para ejecutar el scraping de datos de polen
 * POST /api/scrape - Ejecuta el scraping y guarda en la base de datos
 * 
 * ✅ Nota: Usa fetch mode en todos los entornos (Netlify, Local)
 * polenes.cl sirve datos en HTML estático (sin JavaScript)
 * Timeout: 22 segundos (margen antes de los 26s de Netlify)
 */
export const POST: APIRoute = async () => {
  // Establecer timeout de 22 segundos para dejar margen (Netlify limit: 26s)
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('API timeout: 22 segundos')), 22000)
  );

  try {
    console.log('📡 API: Iniciando scraping de polen con fetch...');
    
    // Race entre el scraping y el timeout
    const pollenData = await Promise.race([
      scrapeAndSavePollenData(),
      timeoutPromise
    ]);
    
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
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    const isTimeoutError = errorMessage.includes('timeout') || errorMessage.includes('AbortError');
    
    console.error('❌ Error en API de scraping:', errorMessage);
    
    return new Response(
      JSON.stringify({
        success: false,
        message: isTimeoutError ? 'Timeout al ejecutar el scraping' : 'Error al ejecutar el scraping',
        error: errorMessage,
        data: null,
        hint: isTimeoutError ? 'El sitio tardó demasiado en responder. Intenta de nuevo más tarde.' : undefined
      }),
      {
        status: isTimeoutError ? 504 : 500,
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
