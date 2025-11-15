import { g as getPollenDataByDateRange, a as getPollenDataByCity } from '../../chunks/supabase_CSj5YIK4.mjs';
export { renderers } from '../../renderers.mjs';

const GET = async ({ url }) => {
  try {
    const params = new URL(url).searchParams;
    const city = params.get("city") || "Santiago";
    const limit = parseInt(params.get("limit") || "10");
    const startDate = params.get("startDate");
    const endDate = params.get("endDate");
    let data;
    if (startDate && endDate) {
      data = await getPollenDataByDateRange(startDate, endDate);
    } else {
      data = await getPollenDataByCity(city, limit);
    }
    if (!data || data.length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "No se encontraron registros históricos",
          data: []
        }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Headers": "Content-Type"
          }
        }
      );
    }
    return new Response(
      JSON.stringify({
        success: true,
        message: `${data.length} registros históricos encontrados`,
        data,
        meta: {
          total: data.length,
          city,
          limit,
          hasDateRange: !!(startDate && endDate)
        }
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
    console.error("Error en /api/history:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Error interno del servidor",
        error: error instanceof Error ? error.message : "Error desconocido"
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Headers": "Content-Type"
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
