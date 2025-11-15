import { SupabasePollenService } from './supabase';

// ⚠️ IMPORTANTE: Puppeteer solo importado en entorno de desarrollo
// Vercel lo excluye automáticamente porque usa process.env.VERCEL
let puppeteer: any = null;
if (process.env.VERCEL !== '1') {
  // Solo importa en desarrollo local
  puppeteer = require('puppeteer');
}

export interface PollenLevel {
  type: string;
  level: string;
  description?: string;
  concentration?: number;
}

export interface PollenData {
  city: string;
  date: string;
  levels: PollenLevel[];
  forecast?: string;
}

// Función para mapear concentración a nivel
const getPollenLevel = (concentration: number): string => {
  if (concentration >= 100) return 'ALTOS';
  if (concentration >= 10) return 'MEDIOS';
  return 'BAJOS';
};

/**
 * Scraping usando fetch directo (para Vercel Serverless)
 * Con reintentos y timeout mejorado
 */
async function scrapeWithFetch(retries = 2): Promise<PollenData | null> {
  try {
    console.log('📡 Scraping con fetch en Vercel...');
    
    // Timeout personalizado: 15 segundos (deja margen para Supabase)
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    
    const response = await fetch('https://www.polenes.cl/?pagina=niveles&ciudad=4', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      signal: controller.signal
    });
    
    clearTimeout(timeout);
    
    if (!response.ok) {
      throw new Error(`Fetch error: ${response.status}`);
    }
    
    const html = await response.text();
    const fullContent = html;
    
    const pollenData: PollenData = {
      city: 'Santiago',
      date: new Date().toLocaleDateString('es-CL'),
      levels: [],
      forecast: ''
    };
    
    // Extraer números de concentración
    const matches = fullContent.match(/(\d+)\s*g\/m[3³]/gi);
    if (matches && matches.length > 0) {
      const numbers: number[] = [];
      for (const match of matches) {
        const numMatch = match.match(/\d+/);
        if (numMatch) {
          numbers.push(parseInt(numMatch[0]));
        }
      }
      
      const labels = ['total de árboles', 'plátano oriental', 'pastos', 'malezas'];
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
    if (error instanceof Error && error.name === 'AbortError') {
      console.error('❌ Timeout en fetch (15s superado)');
    } else {
      console.error('❌ Error en scrapeWithFetch:', error);
    }
    
    // Reintentar una vez si falla
    if (retries > 0) {
      console.log(`⏳ Reintentando... (${retries} intentos restantes)`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      return scrapeWithFetch(retries - 1);
    }
    
    return null;
  }
}

/**
 * Scraping usando Puppeteer (para desarrollo local SOLAMENTE)
 * ⚠️ NUNCA se ejecuta en Vercel
 */
async function scrapeWithPuppeteer(): Promise<PollenData | null> {
  // Verificación extra: nunca intentes ejecutar en Vercel
  if (process.env.VERCEL === '1') {
    console.error('❌ ERROR: Intentaste ejecutar Puppeteer en Vercel. Usar scrapeWithFetch en su lugar.');
    return null;
  }
  
  let browser;
  
  try {
    console.log('📡 Scraping con Puppeteer (Local Development)...');
    
    // Puppeteer solo disponible en desarrollo
    if (!puppeteer) {
      console.error('❌ Puppeteer no está disponible (esperado en Vercel)');
      return null;
    }
    
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    await page.goto('https://www.polenes.cl/?pagina=niveles&ciudad=4', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const content = await page.content();
    
    const pollenData: PollenData = {
      city: 'Santiago',
      date: new Date().toLocaleDateString('es-CL'),
      levels: [],
      forecast: ''
    };
    
    // Extraer números
    const matches = content.match(/(\d+)\s*g\/m[3³]/gi);
    if (matches && matches.length > 0) {
      const numbers: number[] = [];
      for (const match of matches) {
        const numMatch = match.match(/\d+/);
        if (numMatch) {
          numbers.push(parseInt(numMatch[0]));
        }
      }
      
      const labels = ['total de árboles', 'plátano oriental', 'pastos', 'malezas'];
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
    console.error('❌ Error en scrapeWithPuppeteer:', error);
    return null;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

/**
 * Función principal
 */
export async function scrapePollenData(): Promise<PollenData | null> {
  const isVercel = process.env.VERCEL === '1';
  
  if (isVercel) {
    return await scrapeWithFetch();
  } else {
    return await scrapeWithPuppeteer();
  }
}

export function displayPollenData(data: PollenData | null): void {
  if (!data) {
    console.log('No data');
    return;
  }
  
  console.log('\n🌼 Polenes en Santiago');
  console.log('======================');
  console.log(`Fecha: ${data.date}`);
  
  if (data.levels.length > 0) {
    console.log('Niveles:');
    data.levels.forEach((level) => {
      console.log(`  • ${level.type}: ${level.level} (${level.concentration} g/m³)`);
    });
  }
}

export async function runPollenScraping(): Promise<void> {
  console.log('🔄 Iniciando scraping...');
  const pollenData = await scrapePollenData();
  displayPollenData(pollenData);
}

export async function scrapeAndSavePollenData(): Promise<PollenData | null> {
  console.log('📡 Scraping y guardado...');
  
  const isConnected = await SupabasePollenService.testConnection();
  if (!isConnected) {
    console.log('⚠️ Sin conexión a Supabase');
  }
  
  const pollenData = await scrapePollenData();
  
  if (pollenData && isConnected) {
    console.log('📤 Guardando en Supabase...');
    try {
      const recordId = await SupabasePollenService.savePollenData(pollenData);
      if (recordId) {
        console.log(`✅ Guardado con ID: ${recordId}`);
      }
    } catch (error) {
      console.error('❌ Error al guardar:', error);
    }
  }
  
  return pollenData;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  runPollenScraping().catch(console.error);
}
