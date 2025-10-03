import type { APIRoute } from 'astro';
import { getLatestPollenData, getPollenDataByCity, testConnection } from '../../lib/supabase';

export const GET: APIRoute = async ({ url }) => {
  try {
    const params = new URL(url).searchParams;
    const action = params.get('action') || 'latest';
    const includeDetails = params.get('details') === 'true';

    // Verificar conexión con base de datos
    const isConnected = await testConnection();
    if (!isConnected) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'No se puede conectar a la base de datos',
          data: null
        }),
        {
          status: 503,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      );
    }

    let data;
    let message;

    switch (action) {
      case 'latest':
        data = await getLatestPollenData();
        message = data ? 'Último registro de polen obtenido' : 'No se encontraron registros';
        break;
      
      case 'current':
        // Obtener los registros más recientes de Santiago (que representa Peñaflor)
        const recentData = await getPollenDataByCity('Santiago', 1);
        data = recentData.length > 0 ? recentData[0] : null;
        message = data ? 'Registro actual de Peñaflor obtenido' : 'No se encontraron registros actuales';
        break;
      
      case 'status':
        // Endpoint para verificar el estado del sistema
        const statusData = await getPollenDataByCity('Santiago', 3);
        return new Response(
          JSON.stringify({
            success: true,
            message: 'Estado del sistema de polen Peñaflor',
            data: {
              status: 'online',
              lastUpdate: statusData.length > 0 ? statusData[0].date : null,
              totalRecords: statusData.length,
              database: 'connected'
            }
          }),
          {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            }
          }
        );
      
      default:
        return new Response(
          JSON.stringify({
            success: false,
            message: 'Acción no válida. Usa: latest, current, o status',
            data: null
          }),
          {
            status: 400,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            }
          }
        );
    }

    if (!data) {
      return new Response(
        JSON.stringify({
          success: false,
          message: message,
          data: null
        }),
        {
          status: 404,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      );
    }

    // Formatear respuesta según si se incluyen detalles
    const responseData = includeDetails ? {
      ...data,
      meta: {
        city: data.city,
        levelsCount: data.levels.length,
        hasForecast: !!data.forecast,
        recordDate: data.date,
        dataSource: 'polenes.cl'
      }
    } : {
      city: data.city,
      date: data.date,
      levels: data.levels.map(level => ({
        type: level.type,
        level: level.level
      })),
      summary: {
        totalTypes: data.levels.length,
        highLevels: data.levels.filter(l => l.level === 'ALTOS').length,
        mediumLevels: data.levels.filter(l => l.level === 'MEDIOS').length,
        lowLevels: data.levels.filter(l => l.level === 'BAJOS').length
      }
    };

    return new Response(
      JSON.stringify({
        success: true,
        message: message,
        data: responseData,
        timestamp: new Date().toISOString()
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
    console.error('Error en /api/penaflor:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Error interno del servidor',
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
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
};