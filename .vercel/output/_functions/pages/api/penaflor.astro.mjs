import { t as testConnection, a as getPollenDataByCity, b as getLatestPollenData } from '../../chunks/supabase_CSj5YIK4.mjs';
export { renderers } from '../../renderers.mjs';

const GET = async ({ url }) => {
  try {
    const params = new URL(url).searchParams;
    const action = params.get("action") || "latest";
    const includeDetails = params.get("details") === "true";
    const isConnected = await testConnection();
    if (!isConnected) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "No se puede conectar a la base de datos",
          data: null
        }),
        {
          status: 503,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        }
      );
    }
    let data;
    let message;
    switch (action) {
      case "latest":
        data = await getLatestPollenData();
        message = data ? "Último registro de polen obtenido" : "No se encontraron registros";
        break;
      case "current":
        const recentData = await getPollenDataByCity("Santiago", 1);
        data = recentData.length > 0 ? recentData[0] : null;
        message = data ? "Registro actual de Peñaflor obtenido" : "No se encontraron registros actuales";
        break;
      case "status":
        const statusData = await getPollenDataByCity("Santiago", 3);
        return new Response(
          JSON.stringify({
            success: true,
            message: "Estado del sistema de polen Peñaflor",
            data: {
              status: "online",
              lastUpdate: statusData.length > 0 ? statusData[0].date : null,
              totalRecords: statusData.length,
              database: "connected"
            }
          }),
          {
            status: 200,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*"
            }
          }
        );
      default:
        return new Response(
          JSON.stringify({
            success: false,
            message: "Acción no válida. Usa: latest, current, o status",
            data: null
          }),
          {
            status: 400,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*"
            }
          }
        );
    }
    if (!data) {
      return new Response(
        JSON.stringify({
          success: false,
          message,
          data: null
        }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        }
      );
    }
    const responseData = includeDetails ? {
      ...data,
      meta: {
        city: data.city,
        levelsCount: data.levels.length,
        hasForecast: !!data.forecast,
        recordDate: data.date,
        dataSource: "polenes.cl"
      }
    } : {
      city: data.city,
      date: data.date,
      levels: data.levels.map((level) => ({
        type: level.type,
        level: level.level
      })),
      summary: {
        totalTypes: data.levels.length,
        highLevels: data.levels.filter((l) => l.level === "ALTOS").length,
        mediumLevels: data.levels.filter((l) => l.level === "MEDIOS").length,
        lowLevels: data.levels.filter((l) => l.level === "BAJOS").length
      }
    };
    return new Response(
      JSON.stringify({
        success: true,
        message,
        data: responseData,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      }
    );
  } catch (error) {
    console.error("Error en /api/penaflor:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Error interno del servidor",
        error: error instanceof Error ? error.message : "Error desconocido",
        data: null
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      }
    );
  }
};
const OPTIONS = async () => {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  OPTIONS
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
