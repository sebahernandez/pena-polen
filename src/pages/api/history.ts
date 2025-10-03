import type { APIRoute } from 'astro';
import { getPollenDataByCity, getPollenDataByDateRange } from '../../lib/supabase';

export const GET: APIRoute = async ({ url }) => {
  try {
    const params = new URL(url).searchParams;
    const city = params.get('city') || 'Santiago';
    const limit = parseInt(params.get('limit') || '10');
    const startDate = params.get('startDate');
    const endDate = params.get('endDate');

    let data;

    // Si se proporcionan fechas, usar rango de fechas
    if (startDate && endDate) {
      data = await getPollenDataByDateRange(startDate, endDate);
    } else {
      // Obtener registros históricos por ciudad
      data = await getPollenDataByCity(city, limit);
    }

    if (!data || data.length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'No se encontraron registros históricos',
          data: []
        }),
        {
          status: 404,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type'
          }
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `${data.length} registros históricos encontrados`,
        data: data,
        meta: {
          total: data.length,
          city: city,
          limit: limit,
          hasDateRange: !!(startDate && endDate)
        }
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      }
    );

  } catch (error) {
    console.error('Error en /api/history:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Error interno del servidor',
        error: error instanceof Error ? error.message : 'Error desconocido'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET',
          'Access-Control-Allow-Headers': 'Content-Type'
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
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
};