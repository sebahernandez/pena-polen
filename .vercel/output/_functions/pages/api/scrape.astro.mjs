import 'cheerio';
import { S as SupabasePollenService } from '../../chunks/supabase_CSj5YIK4.mjs';
import puppeteer from 'puppeteer';
export { renderers } from '../../renderers.mjs';

const getPollenLevel = (concentration) => {
  if (concentration >= 100) return "ALTOS";
  if (concentration >= 10) return "MEDIOS";
  return "BAJOS";
};
async function scrapeWithFetch() {
  try {
    console.log("📡 Scraping con fetch en Vercel...");
    const response = await fetch("https://www.polenes.cl/?pagina=niveles&ciudad=4", {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
      }
    });
    if (!response.ok) {
      throw new Error(`Fetch error: ${response.status}`);
    }
    const html = await response.text();
    const fullContent = html;
    const pollenData = {
      city: "Santiago",
      date: (/* @__PURE__ */ new Date()).toLocaleDateString("es-CL"),
      levels: [],
      forecast: ""
    };
    const matches = fullContent.match(/(\d+)\s*g\/m[3³]/gi);
    if (matches && matches.length > 0) {
      const numbers = [];
      for (const match of matches) {
        const numMatch = match.match(/\d+/);
        if (numMatch) {
          numbers.push(parseInt(numMatch[0]));
        }
      }
      const labels = ["total de árboles", "plátano oriental", "pastos", "malezas"];
      for (let i = 0; i < Math.min(numbers.length, labels.length); i++) {
        pollenData.levels.push({
          type: labels[i],
          level: getPollenLevel(numbers[i]),
          concentration: numbers[i]
        });
      }
    }
    return pollenData;
  } catch (error) {
    console.error("❌ Error en scrapeWithFetch:", error);
    return null;
  }
}
async function scrapeWithPuppeteer() {
  let browser;
  try {
    console.log("📡 Scraping con Puppeteer...");
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });
    const page = await browser.newPage();
    await page.goto("https://www.polenes.cl/?pagina=niveles&ciudad=4", {
      waitUntil: "networkidle2",
      timeout: 3e4
    });
    await new Promise((resolve) => setTimeout(resolve, 2e3));
    const content = await page.content();
    const pollenData = {
      city: "Santiago",
      date: (/* @__PURE__ */ new Date()).toLocaleDateString("es-CL"),
      levels: [],
      forecast: ""
    };
    const matches = content.match(/(\d+)\s*g\/m[3³]/gi);
    if (matches && matches.length > 0) {
      const numbers = [];
      for (const match of matches) {
        const numMatch = match.match(/\d+/);
        if (numMatch) {
          numbers.push(parseInt(numMatch[0]));
        }
      }
      const labels = ["total de árboles", "plátano oriental", "pastos", "malezas"];
      for (let i = 0; i < Math.min(numbers.length, labels.length); i++) {
        pollenData.levels.push({
          type: labels[i],
          level: getPollenLevel(numbers[i]),
          concentration: numbers[i]
        });
      }
    }
    return pollenData;
  } catch (error) {
    console.error("❌ Error en scrapeWithPuppeteer:", error);
    return null;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
async function scrapePollenData() {
  const isVercel = process.env.VERCEL === "1";
  if (isVercel) {
    return await scrapeWithFetch();
  } else {
    return await scrapeWithPuppeteer();
  }
}
function displayPollenData(data) {
  if (!data) {
    console.log("No data");
    return;
  }
  console.log("\n🌼 Polenes en Santiago");
  console.log("======================");
  console.log(`Fecha: ${data.date}`);
  if (data.levels.length > 0) {
    console.log("Niveles:");
    data.levels.forEach((level) => {
      console.log(`  • ${level.type}: ${level.level} (${level.concentration} g/m³)`);
    });
  }
}
async function runPollenScraping() {
  console.log("🔄 Iniciando scraping...");
  const pollenData = await scrapePollenData();
  displayPollenData(pollenData);
}
async function scrapeAndSavePollenData() {
  console.log("📡 Scraping y guardado...");
  const isConnected = await SupabasePollenService.testConnection();
  if (!isConnected) {
    console.log("⚠️ Sin conexión a Supabase");
  }
  const pollenData = await scrapePollenData();
  if (pollenData && isConnected) {
    console.log("📤 Guardando en Supabase...");
    try {
      const recordId = await SupabasePollenService.savePollenData(pollenData);
      if (recordId) {
        console.log(`✅ Guardado con ID: ${recordId}`);
      }
    } catch (error) {
      console.error("❌ Error al guardar:", error);
    }
  }
  return pollenData;
}
if (import.meta.url === `file://${process.argv[1]}`) {
  runPollenScraping().catch(console.error);
}

const POST = async () => {
  try {
    console.log("📡 API: Iniciando scraping de polen...");
    const pollenData = await scrapeAndSavePollenData();
    if (!pollenData) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "No se pudieron obtener datos de polen",
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
    return new Response(
      JSON.stringify({
        success: true,
        message: "Scraping completado exitosamente",
        data: pollenData,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      }
    );
  } catch (error) {
    console.error("❌ Error en API de scraping:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Error al ejecutar el scraping",
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
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  OPTIONS,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
