import { e as createComponent, m as maybeRenderHead, k as renderScript, r as renderTemplate, f as createAstro, l as renderSlot, n as renderHead, h as addAttribute, o as renderComponent } from '../chunks/astro/server_CIyPCajn.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                                 */
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { TrendingUp, Minus, TrendingDown, ChevronLeft, ChevronRight, Calendar, MapPin, History, RefreshCw } from 'lucide-react';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from 'recharts';
import { b as getLatestPollenData } from '../chunks/supabase_CSj5YIK4.mjs';
export { renderers } from '../renderers.mjs';

const $$Header = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`<!-- Navbar Container - Fixed y Floating -->${maybeRenderHead()}<div class="fixed top-0 left-0 right-0 z-50 px-2 sm:px-6 lg:px-8 py-2 sm:py-4 pointer-events-none"> <nav class="max-w-7xl mx-auto bg-white/75 light:bg-white/80 dark:bg-gray-900/70 backdrop-blur-xl rounded-2xl shadow-2xl shadow-gray-300/20 dark:shadow-gray-900/40 border border-white/30 light:border-gray-200/40 dark:border-gray-700/40 transition-all duration-200 pointer-events-auto"> <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent dark:from-indigo-500/5 dark:to-transparent pointer-events-none"></div> <div class="px-2 sm:px-6 lg:px-8 relative z-10"> <div class="relative flex h-14 sm:h-16 items-center justify-between"> <div class="absolute inset-y-0 left-0 flex items-center sm:hidden"> <!-- Mobile menu button--> <button type="button" id="mobile-menu-button" class="relative inline-flex items-center justify-center rounded-lg p-1.5 text-gray-600 light:text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 light:hover:bg-gray-200/80 dark:hover:bg-gray-800/80 hover:text-gray-900 light:hover:text-black dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-all duration-200" aria-controls="mobile-menu" aria-expanded="false"> <span class="sr-only">Abrir menú principal</span> <!-- Hamburger icon --> <svg id="hamburger-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="size-5"> <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" stroke-linecap="round" stroke-linejoin="round"></path> </svg> <!-- Close icon --> <svg id="close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="size-5 hidden"> <path d="M6 18 18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round"></path> </svg> </button> </div> <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"> <div class="flex shrink-0 items-center"> <a href="/" class="flex items-center space-x-1 sm:space-x-2 group"> <div class="bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-500 rounded-lg sm:rounded-xl p-1 sm:p-1.5 shadow-md group-hover:shadow-lg transition-all duration-200"> <!-- Logo de Polen - Flores/Plantas con estilo moderno --> <svg class="size-5 sm:size-6 text-white" fill="currentColor" viewBox="0 0 24 24"> <!-- Pétalos principales del polen/flor --> <circle cx="12" cy="6" r="2.5" opacity="0.9"></circle> <circle cx="18" cy="10" r="2.5" opacity="0.85"></circle> <circle cx="18" cy="14" r="2.5" opacity="0.85"></circle> <circle cx="12" cy="18" r="2.5" opacity="0.9"></circle> <circle cx="6" cy="14" r="2.5" opacity="0.85"></circle> <circle cx="6" cy="10" r="2.5" opacity="0.85"></circle> <!-- Centro del polen --> <circle cx="12" cy="12" r="3.5" opacity="1"></circle> </svg> </div> <span class="text-gray-900 light:text-black dark:text-gray-100 font-bold tracking-tight text-xs sm:text-lg">Peña Polen</span> </a> </div> <div class="hidden sm:ml-8 sm:flex sm:items-center"> <div class="flex space-x-1 bg-gray-100/50 light:bg-gray-200/50 dark:bg-gray-800/50 rounded-xl p-1"> <a href="#" data-section="hero" class="scroll-link rounded-lg bg-white light:bg-white dark:bg-gray-700 px-4 py-2 text-sm font-semibold text-gray-900 light:text-black dark:text-white transition-all duration-200">Inicio</a> <a href="#" data-section="mapa" class="scroll-link rounded-lg px-4 py-2 text-sm font-medium text-gray-600 light:text-gray-700 dark:text-gray-300 hover:bg-white/50 light:hover:bg-white/70 dark:hover:bg-gray-700/50 hover:text-gray-900 light:hover:text-black dark:hover:text-white transition-all duration-200">Mapa</a> <a href="#" data-section="historial" class="scroll-link rounded-lg px-4 py-2 text-sm font-medium text-gray-600 light:text-gray-700 dark:text-gray-300 hover:bg-white/50 light:hover:bg-white/70 dark:hover:bg-gray-700/50 hover:text-gray-900 light:hover:text-black dark:hover:text-white transition-all duration-200">Historial</a> <a href="#" data-section="forecast" class="scroll-link rounded-lg px-4 py-2 text-sm font-medium text-gray-600 light:text-gray-700 dark:text-gray-300 hover:bg-white/50 light:hover:bg-white/70 dark:hover:bg-gray-700/50 hover:text-gray-900 light:hover:text-black dark:hover:text-white transition-all duration-200">Pronóstico</a> </div> </div> </div> <div class="absolute inset-y-0 right-0 flex items-center gap-1 sm:gap-2 pr-1 sm:static sm:inset-auto sm:ml-6 sm:pr-0"> <!-- Dark Mode Toggle --> <button type="button" id="theme-toggle" class="relative rounded-lg sm:rounded-xl p-1.5 sm:p-2.5 text-gray-600 light:text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 light:hover:bg-gray-200/80 dark:hover:bg-gray-800/80 hover:text-gray-900 light:hover:text-black dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-all duration-200" title="Cambiar tema"> <span class="sr-only">Alternar modo oscuro</span> <!-- Sun Icon (visible en dark mode) --> <svg id="theme-toggle-light-icon" class="size-4 sm:size-5 hidden" fill="currentColor" viewBox="0 0 20 20"> <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fill-rule="evenodd" clip-rule="evenodd"></path> </svg> <!-- Moon Icon (visible en light mode) --> <svg id="theme-toggle-dark-icon" class="size-4 sm:size-5" fill="currentColor" viewBox="0 0 20 20"> <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path> </svg> </button> <!-- Notifications Button with Dropdown --> <div class="relative"> <button type="button" id="notifications-button" class="relative rounded-lg sm:rounded-xl p-1.5 sm:p-2.5 text-gray-600 light:text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 light:hover:bg-gray-200/80 dark:hover:bg-gray-800/80 hover:text-gray-900 light:hover:text-black dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-all duration-200"> <span class="sr-only">Ver notificaciones</span> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="size-4 sm:size-5"> <path d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" stroke-linecap="round" stroke-linejoin="round"></path> </svg> <!-- Badge para notificaciones no leídas --> <span id="notification-badge" class="absolute top-1 right-1 hidden"> <span class="animate-notification-pulse inline-flex h-3 w-3 rounded-full bg-indigo-500 opacity-75 shadow-lg"></span> </span> </button> <!-- Dropdown de notificaciones --> <div id="notifications-dropdown" class="hidden absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"> <!-- Header del dropdown --> <div class="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-800"> <div class="flex items-center justify-between"> <h3 class="text-sm font-semibold text-gray-900 dark:text-white">Notificaciones</h3> <button id="mark-all-read" class="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
Marcar todas como leídas
</button> </div> </div> <!-- Lista de notificaciones --> <div id="notifications-list" class="max-h-96 overflow-y-auto"> <!-- Las notificaciones se cargarán dinámicamente aquí --> <div class="px-4 py-8 text-center text-gray-500 dark:text-gray-400"> <svg class="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path> </svg> <p class="text-sm">No hay notificaciones</p> </div> </div> </div> </div> </div> </div> </div> <!-- Mobile menu --> <div id="mobile-menu" class="hidden sm:hidden absolute top-full left-0 right-0 mt-2 mx-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl shadow-2xl shadow-gray-300/30 dark:shadow-gray-900/50 border border-white/40 dark:border-gray-700/50 overflow-hidden z-40 animate-in slide-in-from-top-2 duration-200"> <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent dark:from-indigo-400/10 dark:to-transparent pointer-events-none"></div> <div class="relative z-10 space-y-1 px-4 py-3"> <a href="#" data-section="hero" class="scroll-link block rounded-lg px-4 py-3 text-base font-semibold text-gray-900 dark:text-white bg-indigo-50/50 dark:bg-indigo-900/20 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-all duration-200">Inicio</a> <a href="#" data-section="mapa" class="scroll-link block rounded-lg px-4 py-3 text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white transition-all duration-200">Mapa</a> <a href="#" data-section="historial" class="scroll-link block rounded-lg px-4 py-3 text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white transition-all duration-200">Historial</a> <a href="#" data-section="forecast" class="scroll-link block rounded-lg px-4 py-3 text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white transition-all duration-200">Pronóstico</a> </div> </div> </nav> </div> ${renderScript($$result, "/Users/sebacure/Desktop/proyectos/pena-polen/src/components/Header.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/sebacure/Desktop/proyectos/pena-polen/src/components/Header.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<footer class="my-10 bg-gray-900 dark:bg-gray-950 text-white transition-colors duration-200" data-astro-cid-sz7xmlte> <!-- Main Footer Content --> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" data-astro-cid-sz7xmlte> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" data-astro-cid-sz7xmlte> <!-- Brand Section --> <div class="col-span-1 lg:col-span-2" data-astro-cid-sz7xmlte> <h3 class="text-2xl font-bold text-white mb-4" data-astro-cid-sz7xmlte>PeñaPolen</h3> <p class="text-gray-300 mb-6 leading-relaxed max-w-md" data-astro-cid-sz7xmlte>
Sistema de información sobre niveles de polen en Peñaflor. 
          Consulta datos históricos y proyecciones para cuidar tu salud respiratoria.
</p> </div> <!-- Navigation Section --> <div data-astro-cid-sz7xmlte> <h4 class="text-lg font-semibold mb-4 text-white" data-astro-cid-sz7xmlte>Navegación</h4> <ul class="space-y-3 text-gray-300" data-astro-cid-sz7xmlte> <li data-astro-cid-sz7xmlte> <a href="/" class="hover:text-blue-400 transition-colors duration-200" data-astro-cid-sz7xmlte>
Inicio
</a> </li> <li data-astro-cid-sz7xmlte> <a href="/historial" class="hover:text-blue-400 transition-colors duration-200" data-astro-cid-sz7xmlte>
Historial
</a> </li> <li data-astro-cid-sz7xmlte> <a href="/graficos" class="hover:text-blue-400 transition-colors duration-200" data-astro-cid-sz7xmlte>
Gráficos
</a> </li> <li data-astro-cid-sz7xmlte> <a href="/contacto" class="hover:text-blue-400 transition-colors duration-200" data-astro-cid-sz7xmlte>
Contacto
</a> </li> </ul> </div> <!-- Information Section --> <div data-astro-cid-sz7xmlte> <h4 class="text-lg font-semibold mb-4 text-white" data-astro-cid-sz7xmlte>Información</h4> <ul class="space-y-3 text-gray-300" data-astro-cid-sz7xmlte> <li class="flex items-start" data-astro-cid-sz7xmlte> <span class="text-red-400 mr-2" data-astro-cid-sz7xmlte>•</span> <span class="text-sm" data-astro-cid-sz7xmlte>Niveles Altos: Extremar precauciones</span> </li> <li class="flex items-start" data-astro-cid-sz7xmlte> <span class="text-yellow-400 mr-2" data-astro-cid-sz7xmlte>•</span> <span class="text-sm" data-astro-cid-sz7xmlte>Niveles Medios: Tomar medidas preventivas</span> </li> <li class="flex items-start" data-astro-cid-sz7xmlte> <span class="text-green-400 mr-2" data-astro-cid-sz7xmlte>•</span> <span class="text-sm" data-astro-cid-sz7xmlte>Niveles Bajos: Condiciones favorables</span> </li> <li class="text-xs text-gray-400 mt-4" data-astro-cid-sz7xmlte>
* Consulte siempre con su médico ante síntomas persistentes
</li> </ul> </div> </div> <!-- Data Source Disclaimer --> <div class="mt-12 border-t border-gray-800 pt-8" data-astro-cid-sz7xmlte> <div class="bg-gray-800/50 rounded-lg p-4 mb-6" data-astro-cid-sz7xmlte> <p class="text-xs sm:text-sm text-gray-300 leading-relaxed" data-astro-cid-sz7xmlte> <span class="font-semibold text-gray-200" data-astro-cid-sz7xmlte>Fuente de Datos:</span> La información de niveles de polen es obtenida desde
<a href="https://www.polenes.cl" target="_blank" rel="noopener noreferrer" class="text-indigo-400 hover:text-indigo-300 transition-colors duration-200 underline" data-astro-cid-sz7xmlte>polenes.cl</a>
mediante su información pública y oficial. Los datos representan los niveles de polen en sectores similares a la comuna de Peñaflor según cantidad de árboles y características geográficas. 
          Esta información es referencial y no reemplaza la consulta con profesionales de la salud.
</p> </div> <div class="text-center text-sm text-gray-500" data-astro-cid-sz7xmlte>
&copy; ${(/* @__PURE__ */ new Date()).getFullYear()} AlergiaFlor. Todos los derechos reservados.
</div> </div> </div></footer> `;
}, "/Users/sebacure/Desktop/proyectos/pena-polen/src/components/Footer.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro$1 = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Layout;
  return renderTemplate(_a || (_a = __template(['<html lang="es" class="h-full" data-astro-cid-sckkx6r4> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="apple-touch-icon" href="/favicon.svg"><meta name="generator"', "><title>PenaPolen - Informaci\xF3n de Polen</title><script>\n			// Prevenir flash de contenido sin estilo (FOUC) para dark mode\n			(function() {\n				const savedTheme = localStorage.getItem('color-theme');\n				\n				if (savedTheme === 'light') {\n					document.documentElement.classList.remove('dark');\n					document.documentElement.classList.add('light');\n				} else {\n					// Por defecto usar dark mode\n					document.documentElement.classList.add('dark');\n					document.documentElement.classList.remove('light');\n				}\n			})();\n		<\/script>", '</head> <body class="h-full bg-gray-50 light:bg-white dark:bg-gray-950 text-gray-900 light:text-black dark:text-gray-100 transition-colors duration-200" data-astro-cid-sckkx6r4> ', " </body></html>"])), addAttribute(Astro2.generator, "content"), renderHead(), renderSlot($$result, $$slots["default"]));
}, "/Users/sebacure/Desktop/proyectos/pena-polen/src/layouts/Layout.astro", void 0);

const useHistoryData = (selectedCity) => {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchHistoryData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/history?city=${selectedCity}&limit=100`);
      if (!response.ok) {
        throw new Error("Error al obtener historial");
      }
      const result = await response.json();
      if (result.success) {
        const filteredData = result.data.filter((record) => !record.date.includes("Verificación")).filter((record) => record.levels.some(
          (level) => ["total de árboles", "plátano oriental", "pastos", "malezas"].includes(level.type)
        ));
        console.log(`📊 Total de registros históricos encontrados: ${filteredData.length}`);
        console.log(`📊 Total de registros en respuesta API: ${result.data.length}`);
        setHistoryData(filteredData);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchHistoryData();
  }, [selectedCity]);
  return { historyData, loading, error, refetch: fetchHistoryData };
};
const useFilteredData = (historyData, filters, limit) => {
  const displayedRecords = historyData.slice(0, limit);
  const filteredRecords = displayedRecords.filter((record) => {
    if (filters.searchDate && !record.date.toLowerCase().includes(filters.searchDate.toLowerCase())) {
      return false;
    }
    if (filters.filterLevel !== "all") {
      const hasLevel = record.levels.some(
        (level) => level.level.toLowerCase().includes(filters.filterLevel.toLowerCase())
      );
      if (!hasLevel) return false;
    }
    if (filters.filterPollenType !== "all") {
      const hasType = record.levels.some(
        (level) => level.type.toLowerCase().includes(filters.filterPollenType.toLowerCase())
      );
      if (!hasType) return false;
    }
    return true;
  });
  return { displayedRecords, filteredRecords };
};
const usePagination = (filteredRecords, pagination) => {
  const totalPages = Math.ceil(filteredRecords.length / pagination.recordsPerPage);
  const startIndex = (pagination.currentPage - 1) * pagination.recordsPerPage;
  const endIndex = startIndex + pagination.recordsPerPage;
  const paginatedRecords = filteredRecords.slice(startIndex, endIndex);
  const needsScrolling = paginatedRecords.length > 10;
  return {
    paginatedRecords,
    totalPages,
    startIndex,
    endIndex,
    needsScrolling
  };
};

const getLevelColor = (level) => {
  switch (level) {
    case "ALTOS":
    case "ALTO":
      return "text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-200";
    case "MEDIOS":
    case "MEDIO":
      return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200";
    case "BAJOS":
    case "BAJO":
      return "text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200";
    default:
      return "text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-200";
  }
};
const getConcentrationValue = (level) => {
  if (level?.description?.includes("g/m³")) {
    const match = level.description.match(/(\d+)\s*g\/m³/);
    return match ? parseInt(match[1]) : 0;
  }
  switch (level?.level) {
    case "ALTOS":
    case "ALTO":
      return 100;
    case "MEDIOS":
    case "MEDIO":
      return 50;
    case "BAJOS":
    case "BAJO":
      return 10;
    default:
      return 0;
  }
};

function SummaryCards({ selectedRecord }) {
  if (!selectedRecord || selectedRecord.date.includes("Verificación")) {
    return null;
  }
  const totalArboles = selectedRecord.levels.find((l) => l.type === "total de árboles");
  const platano = selectedRecord.levels.find((l) => l.type === "plátano oriental");
  const malezas = selectedRecord.levels.find((l) => l.type === "malezas");
  const pastos = selectedRecord.levels.find((l) => l.type === "pastos");
  return /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-red-50 dark:bg-red-900/20 rounded-lg p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-red-600 dark:text-red-400", children: "Total Árboles" }),
          /* @__PURE__ */ jsxs("p", { className: "text-2xl font-bold text-red-700 dark:text-red-300", children: [
            getConcentrationValue(totalArboles),
            " g/m³"
          ] })
        ] }),
        /* @__PURE__ */ jsx(TrendingUp, { className: "w-8 h-8 text-red-500" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "text-xs text-red-600 dark:text-red-400", children: "Concentración total de árboles" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-red-50 dark:bg-red-900/20 rounded-lg p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-red-600 dark:text-red-400", children: "Plátano Oriental" }),
          /* @__PURE__ */ jsxs("p", { className: "text-2xl font-bold text-red-700 dark:text-red-300", children: [
            getConcentrationValue(platano),
            " g/m³"
          ] })
        ] }),
        /* @__PURE__ */ jsx(TrendingUp, { className: "w-8 h-8 text-red-500" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "text-xs text-red-600 dark:text-red-400", children: "Concentración plátano oriental" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-yellow-600 dark:text-yellow-400", children: "Malezas" }),
          /* @__PURE__ */ jsxs("p", { className: "text-2xl font-bold text-yellow-700 dark:text-yellow-300", children: [
            getConcentrationValue(malezas),
            " g/m³"
          ] })
        ] }),
        /* @__PURE__ */ jsx(Minus, { className: "w-8 h-8 text-yellow-500" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "text-xs text-yellow-600 dark:text-yellow-400", children: "Concentración malezas" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-green-50 dark:bg-green-900/20 rounded-lg p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-green-600 dark:text-green-400", children: "Pastos" }),
          /* @__PURE__ */ jsxs("p", { className: "text-2xl font-bold text-green-700 dark:text-green-300", children: [
            getConcentrationValue(pastos),
            " g/m³"
          ] })
        ] }),
        /* @__PURE__ */ jsx(TrendingDown, { className: "w-8 h-8 text-green-500" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "text-xs text-green-600 dark:text-green-400", children: "Concentración pastos" })
    ] })
  ] });
}

function PollenChart({ selectedRecord }) {
  if (!selectedRecord) return null;
  const chartData = [selectedRecord].filter((record) => !record.date.includes("Verificación")).map((record) => {
    const totalArboles = record.levels.find((l) => l.type === "total de árboles");
    const platanoOriental = record.levels.find((l) => l.type === "plátano oriental");
    const pastos = record.levels.find((l) => l.type === "pastos");
    const malezas = record.levels.find((l) => l.type === "malezas");
    return {
      name: `Registro ${record.date}`,
      date: record.date,
      "Total Árboles": getConcentrationValue(totalArboles),
      "Plátano Oriental": getConcentrationValue(platanoOriental),
      "Pastos": getConcentrationValue(pastos),
      "Malezas": getConcentrationValue(malezas)
    };
  });
  if (chartData.length === 0) return null;
  return /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
    /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white mb-4", children: [
      "Concentraciones de Polen (g/m³)",
      /* @__PURE__ */ jsxs("span", { className: "ml-2 text-sm text-indigo-600 dark:text-indigo-400 font-normal", children: [
        "- ",
        selectedRecord.date
      ] })
    ] }),
    /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: 250, children: /* @__PURE__ */ jsxs(BarChart, { data: chartData, margin: { top: 20, right: 30, left: 20, bottom: 5 }, children: [
      /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3", className: "opacity-30" }),
      /* @__PURE__ */ jsx(
        XAxis,
        {
          dataKey: "name",
          tick: { fontSize: 12 }
        }
      ),
      /* @__PURE__ */ jsx(YAxis, {}),
      /* @__PURE__ */ jsx(
        Tooltip,
        {
          labelFormatter: (label) => `${label}`,
          formatter: (value, name) => {
            if (value > 0) {
              return [`${value} g/m³`, name];
            }
            return null;
          },
          content: ({ active, payload, label }) => {
            if (active && payload && payload.length) {
              const activeData = payload.filter((entry) => entry.value > 0);
              if (activeData.length === 0) return null;
              return /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg", children: [
                /* @__PURE__ */ jsx("p", { className: "font-medium text-gray-900 dark:text-white mb-2", children: label }),
                activeData.map((entry, index) => /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: "w-3 h-3 rounded mr-2",
                      style: { backgroundColor: entry.color }
                    }
                  ),
                  /* @__PURE__ */ jsxs("span", { className: "text-sm text-gray-700 dark:text-gray-300", children: [
                    entry.name,
                    ": ",
                    /* @__PURE__ */ jsxs("span", { className: "font-semibold", children: [
                      entry.value,
                      " g/m³"
                    ] })
                  ] })
                ] }, index))
              ] });
            }
            return null;
          }
        }
      ),
      /* @__PURE__ */ jsx(Bar, { dataKey: "Total Árboles", fill: "#ef4444", name: "Total Árboles", radius: [4, 4, 0, 0] }),
      /* @__PURE__ */ jsx(Bar, { dataKey: "Plátano Oriental", fill: "#dc2626", name: "Plátano Oriental", radius: [4, 4, 0, 0] }),
      /* @__PURE__ */ jsx(Bar, { dataKey: "Pastos", fill: "#10b981", name: "Pastos", radius: [4, 4, 0, 0] }),
      /* @__PURE__ */ jsx(Bar, { dataKey: "Malezas", fill: "#f59e0b", name: "Malezas", radius: [4, 4, 0, 0] })
    ] }) })
  ] });
}

function TableFilters({
  filters,
  onFilterChange,
  recordsPerPage,
  onRecordsPerPageChange,
  filteredCount,
  displayedCount
}) {
  const hasActiveFilters = filters.searchDate || filters.filterLevel !== "all" || filters.filterPollenType !== "all";
  const clearFilters = () => {
    onFilterChange({
      searchDate: "",
      filterLevel: "all",
      filterPollenType: "all"
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "px-6 py-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Buscar por fecha" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            placeholder: "Ej: octubre, 15-21",
            value: filters.searchDate,
            onChange: (e) => onFilterChange({ ...filters, searchDate: e.target.value }),
            className: "w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Nivel de polen" }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            value: filters.filterLevel,
            onChange: (e) => onFilterChange({ ...filters, filterLevel: e.target.value }),
            className: "w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent",
            children: [
              /* @__PURE__ */ jsx("option", { value: "all", children: "Todos los niveles" }),
              /* @__PURE__ */ jsx("option", { value: "alto", children: "Altos" }),
              /* @__PURE__ */ jsx("option", { value: "medio", children: "Medios" }),
              /* @__PURE__ */ jsx("option", { value: "bajo", children: "Bajos" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Tipo de polen" }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            value: filters.filterPollenType,
            onChange: (e) => onFilterChange({ ...filters, filterPollenType: e.target.value }),
            className: "w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent",
            children: [
              /* @__PURE__ */ jsx("option", { value: "all", children: "Todos los tipos" }),
              /* @__PURE__ */ jsx("option", { value: "árboles", children: "Total de Árboles" }),
              /* @__PURE__ */ jsx("option", { value: "plátano", children: "Plátano Oriental" }),
              /* @__PURE__ */ jsx("option", { value: "pastos", children: "Pastos" }),
              /* @__PURE__ */ jsx("option", { value: "malezas", children: "Malezas" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Registros por página" }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            value: recordsPerPage,
            onChange: (e) => onRecordsPerPageChange(Number(e.target.value)),
            className: "w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent",
            children: [
              /* @__PURE__ */ jsx("option", { value: 5, children: "5 registros" }),
              /* @__PURE__ */ jsx("option", { value: 10, children: "10 registros" }),
              /* @__PURE__ */ jsx("option", { value: 20, children: "20 registros" }),
              /* @__PURE__ */ jsx("option", { value: 50, children: "50 registros" })
            ]
          }
        )
      ] })
    ] }),
    hasActiveFilters && /* @__PURE__ */ jsxs("div", { className: "mt-3 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("span", { className: "text-xs text-gray-600 dark:text-gray-400", children: [
        "Mostrando ",
        filteredCount,
        " registros filtrados"
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: clearFilters,
          className: "text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 font-medium",
          children: "Limpiar filtros"
        }
      )
    ] })
  ] });
}

function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
  startIndex,
  endIndex,
  totalRecords
}) {
  if (totalPages <= 1) return null;
  const getPageNumbers = () => {
    return Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
      if (totalPages <= 5) {
        return i + 1;
      } else if (currentPage <= 3) {
        return i + 1;
      } else if (currentPage >= totalPages - 2) {
        return totalPages - 4 + i;
      } else {
        return currentPage - 2 + i;
      }
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center justify-between", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-xs text-gray-600 dark:text-gray-400", children: [
      "Página ",
      currentPage,
      " de ",
      totalPages,
      " • Mostrando ",
      startIndex + 1,
      "-",
      Math.min(endIndex, totalRecords),
      " de ",
      totalRecords
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => onPageChange(Math.max(1, currentPage - 1)),
          disabled: currentPage === 1,
          className: `
            p-2 rounded-lg border transition-colors
            ${currentPage === 1 ? "border-gray-200 dark:border-gray-600 text-gray-400 dark:text-gray-600 cursor-not-allowed" : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"}
          `,
          children: /* @__PURE__ */ jsx(ChevronLeft, { className: "w-4 h-4" })
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "flex gap-1", children: getPageNumbers().map((pageNum, i) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => onPageChange(pageNum),
          className: `
                px-3 py-1 text-xs rounded-lg border transition-colors
                ${currentPage === pageNum ? "bg-blue-500 border-blue-500 text-white" : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"}
              `,
          children: pageNum
        },
        i
      )) }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => onPageChange(Math.min(totalPages, currentPage + 1)),
          disabled: currentPage === totalPages,
          className: `
            p-2 rounded-lg border transition-colors
            ${currentPage === totalPages ? "border-gray-200 dark:border-gray-600 text-gray-400 dark:text-gray-600 cursor-not-allowed" : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"}
          `,
          children: /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4" })
        }
      )
    ] })
  ] });
}

const getLevelIcon = (level) => {
  switch (level) {
    case "ALTOS":
    case "ALTO":
      return /* @__PURE__ */ jsx(TrendingUp, { className: "w-4 h-4" });
    case "MEDIOS":
    case "MEDIO":
      return /* @__PURE__ */ jsx(Minus, { className: "w-4 h-4" });
    case "BAJOS":
    case "BAJO":
      return /* @__PURE__ */ jsx(TrendingDown, { className: "w-4 h-4" });
    default:
      return /* @__PURE__ */ jsx(Minus, { className: "w-4 h-4" });
  }
};
function HistoryTable({
  records,
  selectedIndex,
  onSelectRecord,
  needsScrolling
}) {
  return /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsx("div", { className: needsScrolling ? "max-h-[600px] overflow-y-auto" : "", children: /* @__PURE__ */ jsxs("table", { className: "w-full", children: [
    /* @__PURE__ */ jsx("thead", { className: "bg-gray-50 dark:bg-gray-700 sticky top-0 z-10", children: /* @__PURE__ */ jsxs("tr", { children: [
      /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4 mr-2" }),
        "Fecha"
      ] }) }),
      /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx(MapPin, { className: "w-4 h-4 mr-2" }),
        "Ciudad"
      ] }) }),
      /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider", children: "Niveles de Polen" }),
      /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider", children: "Resumen" })
    ] }) }),
    /* @__PURE__ */ jsx("tbody", { className: "bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700", children: records.map((record, index) => {
      const isSelected = selectedIndex === index;
      return /* @__PURE__ */ jsxs(
        "tr",
        {
          onClick: () => onSelectRecord(index),
          className: `
                    cursor-pointer transition-all duration-200
                    ${isSelected ? "bg-indigo-100 dark:bg-indigo-900/30 border-l-4 border-l-indigo-600" : "hover:bg-gray-50 dark:hover:bg-gray-700"}
                  `,
          children: [
            /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-900 dark:text-white font-medium", children: record.date }) }),
            /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-900 dark:text-white", children: record.city === "Santiago" ? "Peñaflor" : record.city }) }),
            /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
              record.levels.slice(0, 4).map((level, levelIndex) => /* @__PURE__ */ jsxs(
                "span",
                {
                  className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLevelColor(level.level)}`,
                  children: [
                    getLevelIcon(level.level),
                    /* @__PURE__ */ jsx("span", { className: "ml-1", children: level.type })
                  ]
                },
                levelIndex
              )),
              record.levels.length > 4 && /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300", children: [
                "+",
                record.levels.length - 4,
                " más"
              ] })
            ] }) }),
            /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400", children: /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                "Total: ",
                record.levels.length,
                " tipos"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex space-x-3 text-xs", children: [
                /* @__PURE__ */ jsxs("span", { className: "text-red-600", children: [
                  "Altos: ",
                  record.levels.filter((l) => l.level === "ALTOS" || l.level === "ALTO").length
                ] }),
                /* @__PURE__ */ jsxs("span", { className: "text-yellow-600", children: [
                  "Medios: ",
                  record.levels.filter((l) => l.level === "MEDIOS" || l.level === "MEDIO").length
                ] }),
                /* @__PURE__ */ jsxs("span", { className: "text-green-600", children: [
                  "Bajos: ",
                  record.levels.filter((l) => l.level === "BAJOS" || l.level === "BAJO").length
                ] })
              ] })
            ] }) })
          ]
        },
        index
      );
    }) })
  ] }) }) });
}

function TableHistory() {
  const [selectedCity] = useState("Santiago");
  const [limit] = useState(50);
  const [selectedRecordIndex, setSelectedRecordIndex] = useState(null);
  const [filters, setFilters] = useState({
    searchDate: "",
    filterLevel: "all",
    filterPollenType: "all"
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const { historyData, loading, error, refetch } = useHistoryData(selectedCity);
  const { displayedRecords, filteredRecords } = useFilteredData(historyData, filters, limit);
  const { paginatedRecords, totalPages, startIndex, endIndex, needsScrolling } = usePagination(
    filteredRecords,
    { currentPage, recordsPerPage }
  );
  const selectedRecord = selectedRecordIndex !== null ? historyData[selectedRecordIndex] : null;
  useEffect(() => {
    if (selectedRecordIndex !== null && selectedRecordIndex >= limit) {
      setSelectedRecordIndex(0);
    }
  }, [limit, selectedRecordIndex]);
  useEffect(() => {
    if (filteredRecords.length > 0 && (selectedRecordIndex === null || selectedRecordIndex >= filteredRecords.length)) {
      setSelectedRecordIndex(0);
    }
  }, [filters.searchDate, filters.filterLevel, filters.filterPollenType, filteredRecords.length, selectedRecordIndex]);
  useEffect(() => {
    setCurrentPage(1);
  }, [filters.searchDate, filters.filterLevel, filters.filterPollenType, recordsPerPage]);
  if (loading) {
    return /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-pulse", children: [
      /* @__PURE__ */ jsx("div", { className: "h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4" }),
      /* @__PURE__ */ jsx("div", { className: "space-y-3", children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsx("div", { className: "h-16 bg-gray-200 dark:bg-gray-700 rounded" }, i)) })
    ] });
  }
  if (error) {
    return /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center text-red-500 mb-4", children: [
        /* @__PURE__ */ jsx(History, { className: "w-5 h-5 mr-2" }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: "Error" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-300", children: error }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: refetch,
          className: "mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center",
          children: [
            /* @__PURE__ */ jsx(RefreshCw, { className: "w-4 h-4 mr-2" }),
            "Reintentar"
          ]
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx(SummaryCards, { selectedRecord }),
    !selectedRecord && historyData.length > 0 && /* @__PURE__ */ jsx("div", { className: "bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center text-blue-700 dark:text-blue-300", children: [
      /* @__PURE__ */ jsx(History, { className: "w-5 h-5 mr-2" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: "Selecciona un registro en la tabla para ver sus concentraciones de polen" })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6", children: [
      /* @__PURE__ */ jsx("div", { className: "flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx(History, { className: "w-6 h-6 mr-3 text-blue-500" }),
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: "Historial" }),
        historyData.length > 0 && /* @__PURE__ */ jsxs("span", { className: "ml-3 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-full", children: [
          historyData.length,
          " ",
          historyData.length === 1 ? "registro" : "registros",
          " total",
          historyData.length === 1 ? "" : "es"
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(PollenChart, { selectedRecord })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden", children: [
      /* @__PURE__ */ jsx(
        TableFilters,
        {
          filters,
          onFilterChange: setFilters,
          recordsPerPage,
          onRecordsPerPageChange: setRecordsPerPage,
          filteredCount: filteredRecords.length,
          displayedCount: displayedRecords.length
        }
      ),
      /* @__PURE__ */ jsx(
        PaginationControls,
        {
          currentPage,
          totalPages,
          onPageChange: setCurrentPage,
          startIndex,
          endIndex,
          totalRecords: filteredRecords.length
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "px-6 py-3 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600 dark:text-gray-300", children: [
        /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Click en una fila" }),
        " para ver sus concentraciones de polen en el gráfico",
        selectedRecordIndex !== null && selectedRecordIndex < paginatedRecords.length && /* @__PURE__ */ jsxs("span", { className: "ml-2 text-indigo-600 dark:text-indigo-400", children: [
          "• Registro ",
          selectedRecordIndex + 1,
          " de ",
          paginatedRecords.length,
          " seleccionado en esta página"
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(
        HistoryTable,
        {
          records: paginatedRecords,
          selectedIndex: selectedRecordIndex,
          onSelectRecord: setSelectedRecordIndex,
          needsScrolling
        }
      ),
      paginatedRecords.length === 0 && filteredRecords.length === 0 && /* @__PURE__ */ jsxs("div", { className: "text-center py-12", children: [
        /* @__PURE__ */ jsx(History, { className: "w-12 h-12 mx-auto text-gray-400 mb-4" }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900 dark:text-white mb-2", children: "No hay registros que coincidan" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-500 dark:text-gray-400", children: displayedRecords.length > 0 ? "Intenta ajustar los filtros para ver más resultados." : "No se encontraron datos históricos." })
      ] })
    ] })
  ] });
}

const $$Astro = createAstro();
const $$ForecastCards = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ForecastCards;
  const { forecast, date } = Astro2.props;
  function parseForecast(forecastString) {
    if (!forecastString) return {};
    const data = {};
    const parts = forecastString.split(" | ");
    parts.forEach((part) => {
      const trimmedPart = part.trim();
      if (trimmedPart.startsWith("Comentarios:")) {
        data.comentarios = trimmedPart.replace("Comentarios:", "").trim();
      } else if (trimmedPart.startsWith("Pron\xF3stico:")) {
        data.pronostico = trimmedPart.replace("Pron\xF3stico:", "").trim();
      } else if (trimmedPart.startsWith("Recomendaciones:")) {
        data.recomendaciones = trimmedPart.replace("Recomendaciones:", "").trim();
      }
    });
    return data;
  }
  const forecastData = parseForecast(forecast);
  const hasData = forecastData.comentarios || forecastData.pronostico || forecastData.recomendaciones;
  return renderTemplate`${hasData && renderTemplate`${maybeRenderHead()}<section class="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950" data-astro-cid-plohenqc><div class="max-w-7xl mx-auto" data-astro-cid-plohenqc><!-- Section Header --><div class="text-center mb-12 animate-fade-in" data-astro-cid-plohenqc><div class="flex items-center justify-center mb-4" data-astro-cid-plohenqc><div class="bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-indigo-500 rounded-2xl p-3 shadow-lg" data-astro-cid-plohenqc><svg class="size-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-plohenqc><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" data-astro-cid-plohenqc></path></svg></div></div><h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4" data-astro-cid-plohenqc>
Información de Polen
</h2><p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto" data-astro-cid-plohenqc>
Pronósticos, comentarios y recomendaciones actualizadas para una mejor prevención
</p>${date && renderTemplate`<p class="text-sm text-gray-500 dark:text-gray-400 mt-2" data-astro-cid-plohenqc>
Actualizado: ${date}</p>`}</div><!-- Cards Grid --><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" data-astro-cid-plohenqc><!-- Comentarios Card -->${forecastData.comentarios && renderTemplate`<div class="group relative animate-fade-in" style="animation-delay: 0.1s;" data-astro-cid-plohenqc><div class="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" data-astro-cid-plohenqc></div><div class="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-gray-300/50 dark:hover:shadow-gray-900/70 h-full" data-astro-cid-plohenqc><!-- Card Header --><div class="px-6 py-4 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20" data-astro-cid-plohenqc><div class="flex items-center space-x-3" data-astro-cid-plohenqc><div class="bg-blue-500 dark:bg-blue-400 rounded-lg p-2 shadow-md" data-astro-cid-plohenqc><svg class="size-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-plohenqc><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-1l-4 4z" data-astro-cid-plohenqc></path></svg></div><div data-astro-cid-plohenqc><h3 class="text-lg font-semibold text-gray-900 dark:text-white" data-astro-cid-plohenqc>Comentarios</h3><p class="text-sm text-gray-500 dark:text-gray-400" data-astro-cid-plohenqc>Situación actual</p></div></div></div><!-- Card Content --><div class="p-6" data-astro-cid-plohenqc><p class="text-gray-700 dark:text-gray-300 leading-relaxed" data-astro-cid-plohenqc>${forecastData.comentarios}</p></div></div></div>`}<!-- Pronóstico Card -->${forecastData.pronostico && renderTemplate`<div class="group relative animate-fade-in" style="animation-delay: 0.2s;" data-astro-cid-plohenqc><div class="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" data-astro-cid-plohenqc></div><div class="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-gray-300/50 dark:hover:shadow-gray-900/70 h-full" data-astro-cid-plohenqc><!-- Card Header --><div class="px-6 py-4 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-indigo-50 to-purple-100 dark:from-indigo-900/20 dark:to-purple-800/20" data-astro-cid-plohenqc><div class="flex items-center space-x-3" data-astro-cid-plohenqc><div class="bg-indigo-500 dark:bg-indigo-400 rounded-lg p-2 shadow-md" data-astro-cid-plohenqc><svg class="size-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-plohenqc><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" data-astro-cid-plohenqc></path></svg></div><div data-astro-cid-plohenqc><h3 class="text-lg font-semibold text-gray-900 dark:text-white" data-astro-cid-plohenqc>Pronóstico</h3><p class="text-sm text-gray-500 dark:text-gray-400" data-astro-cid-plohenqc>Para la semana</p></div></div></div><!-- Card Content --><div class="p-6" data-astro-cid-plohenqc><p class="text-gray-700 dark:text-gray-300 leading-relaxed" data-astro-cid-plohenqc>${forecastData.pronostico}</p></div></div></div>`}<!-- Recomendaciones Card -->${forecastData.recomendaciones && renderTemplate`<div class="group relative animate-fade-in md:col-span-2 lg:col-span-1" style="animation-delay: 0.3s;" data-astro-cid-plohenqc><div class="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" data-astro-cid-plohenqc></div><div class="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-gray-300/50 dark:hover:shadow-gray-900/70 h-full" data-astro-cid-plohenqc><!-- Card Header --><div class="px-6 py-4 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-emerald-50 to-teal-100 dark:from-emerald-900/20 dark:to-teal-800/20" data-astro-cid-plohenqc><div class="flex items-center space-x-3" data-astro-cid-plohenqc><div class="bg-emerald-500 dark:bg-emerald-400 rounded-lg p-2 shadow-md" data-astro-cid-plohenqc><svg class="size-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-plohenqc><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" data-astro-cid-plohenqc></path></svg></div><div data-astro-cid-plohenqc><h3 class="text-lg font-semibold text-gray-900 dark:text-white" data-astro-cid-plohenqc>Recomendaciones</h3><p class="text-sm text-gray-500 dark:text-gray-400" data-astro-cid-plohenqc>Para alérgicos</p></div></div></div><!-- Card Content --><div class="p-6" data-astro-cid-plohenqc><div class="flex items-start space-x-3" data-astro-cid-plohenqc><div class="flex-shrink-0 mt-1" data-astro-cid-plohenqc><div class="bg-emerald-100 dark:bg-emerald-900/30 rounded-full p-1" data-astro-cid-plohenqc><svg class="size-4 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-plohenqc><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-astro-cid-plohenqc></path></svg></div></div><p class="text-gray-700 dark:text-gray-300 leading-relaxed" data-astro-cid-plohenqc>${forecastData.recomendaciones}</p></div></div></div></div>`}</div><!-- Additional Information --><div class="mt-12 text-center animate-fade-in" style="animation-delay: 0.4s;" data-astro-cid-plohenqc><div class="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6 max-w-4xl mx-auto" data-astro-cid-plohenqc><div class="flex items-center justify-center mb-3" data-astro-cid-plohenqc><svg class="size-6 text-amber-600 dark:text-amber-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-plohenqc><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.35 16.5c-.77.833.192 2.5 1.732 2.5z" data-astro-cid-plohenqc></path></svg><span class="text-amber-800 dark:text-amber-200 font-medium" data-astro-cid-plohenqc>Nota Importante</span></div><p class="text-amber-800 dark:text-amber-200 text-sm leading-relaxed" data-astro-cid-plohenqc>
Esta información es de carácter informativo y no sustituye el consejo médico profesional. 
            Si tiene síntomas persistentes o severos de alergia, consulte siempre con su médico o especialista.
</p></div></div></div></section>`}`;
}, "/Users/sebacure/Desktop/proyectos/pena-polen/src/components/ForecastCards.astro", void 0);

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  let pollenData = null;
  try {
    pollenData = await getLatestPollenData();
  } catch (error) {
    console.error("Error al obtener datos de polen:", error);
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "data-astro-cid-j7pv25f6": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, { "data-astro-cid-j7pv25f6": true })} ${maybeRenderHead()}<main class="bg-white light:bg-white dark:bg-gray-950 transition-colors duration-200 pt-20 sm:pt-28 lg:pt-32" data-astro-cid-j7pv25f6> <!-- Hero Section --> <section id="hero" class="pt-8 pb-8 px-4 sm:px-6 lg:px-8" data-astro-cid-j7pv25f6> <div class="max-w-7xl mx-auto" data-astro-cid-j7pv25f6> <!-- Header Text --> <div class="mb-8 animate-fade-in" data-astro-cid-j7pv25f6> <h1 class="text-center text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight" data-astro-cid-j7pv25f6>
Niveles de Polen en <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400" data-astro-cid-j7pv25f6>Peñaflor</span> </h1> <p class="text-center text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto" data-astro-cid-j7pv25f6>
Consulta información actualizada sobre los niveles de polen en tu zona y planifica mejor tus actividades al aire libre.
</p> </div> </div> </section> <!-- Map Section --> <section id="mapa" class="py-8 px-4 sm:px-6 lg:px-8" data-astro-cid-j7pv25f6> <div class="max-w-7xl mx-auto" data-astro-cid-j7pv25f6> <!-- Map Container - Airbnb Style --> <div class="relative group animate-fade-in" data-astro-cid-j7pv25f6> <!-- Main Card --> <div class="relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-gray-900/50 overflow-hidden border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl hover:shadow-gray-300/50 dark:hover:shadow-gray-900/70" data-astro-cid-j7pv25f6> <!-- Map Header --> <div class="px-6 py-4 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-800" data-astro-cid-j7pv25f6> <div class="flex items-center justify-between" data-astro-cid-j7pv25f6> <div class="flex items-center space-x-3" data-astro-cid-j7pv25f6> <div class="bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-500 rounded-xl p-2 shadow-md" data-astro-cid-j7pv25f6> <svg class="size-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-j7pv25f6> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" data-astro-cid-j7pv25f6></path> </svg> </div> <div data-astro-cid-j7pv25f6> <h2 class="text-xl font-semibold text-gray-900 dark:text-white" data-astro-cid-j7pv25f6>Mapa de Cobertura</h2> <p class="text-sm text-gray-500 dark:text-gray-400" data-astro-cid-j7pv25f6>Zona de monitoreo activo</p> </div> </div> <!-- Status Badge --> <div class="flex items-center space-x-2 bg-green-50 dark:bg-green-900/20 px-3 py-1.5 rounded-full" data-astro-cid-j7pv25f6> <div class="relative flex h-2 w-2" data-astro-cid-j7pv25f6> <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" data-astro-cid-j7pv25f6></span> <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500" data-astro-cid-j7pv25f6></span> </div> <span class="text-xs font-medium text-green-700 dark:text-green-400" data-astro-cid-j7pv25f6>Activo</span> </div> </div> </div> <!-- Map Content Area --> <div class="relative" data-astro-cid-j7pv25f6> <!-- Decorative gradient overlay on hover --> <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-b-3xl" data-astro-cid-j7pv25f6></div> <!-- Map Component --> <div class="relative z-10 p-4 sm:p-6" data-astro-cid-j7pv25f6> <div class="bg-gray-100 dark:bg-gray-900 rounded-2xl overflow-hidden shadow-inner" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "MapaPenaflor", null, { "client:only": true, "client:component-hydration": "only", "data-astro-cid-j7pv25f6": true, "client:component-path": "/Users/sebacure/Desktop/proyectos/pena-polen/src/components/map", "client:component-export": "default" })} </div> </div> </div> <!-- Map Footer Info --> <div class="px-6 py-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50" data-astro-cid-j7pv25f6> <div class="flex flex-wrap items-center justify-between gap-4" data-astro-cid-j7pv25f6> <div class="flex items-center space-x-6" data-astro-cid-j7pv25f6> <div class="flex items-center space-x-2 text-sm" data-astro-cid-j7pv25f6> <svg class="size-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-j7pv25f6> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" data-astro-cid-j7pv25f6></path> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" data-astro-cid-j7pv25f6></path> </svg> <span class="font-medium text-gray-700 dark:text-gray-300" data-astro-cid-j7pv25f6>Peñaflor, RM</span> </div> <div class="flex items-center space-x-2 text-sm" data-astro-cid-j7pv25f6> <svg class="size-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-j7pv25f6> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" data-astro-cid-j7pv25f6></path> </svg> <span class="text-gray-600 dark:text-gray-400" data-astro-cid-j7pv25f6>Datos históricos disponibles</span> </div> </div> </div> </div> </div> <!-- Decorative Elements --> <div class="absolute -inset-1 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-3xl -z-10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" data-astro-cid-j7pv25f6></div> </div> </div> </section> <!-- History Section --> <section id="historial" class="py-2 px-4 sm:px-6 lg:px-8" data-astro-cid-j7pv25f6> <div class="mx-auto max-w-7xl" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "TableHistory", TableHistory, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/sebacure/Desktop/proyectos/pena-polen/src/components/tablehistory", "client:component-export": "default", "data-astro-cid-j7pv25f6": true })} </div> </section> <!-- Forecast Cards Section --> <section id="forecast" class="w-full" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "ForecastCards", $$ForecastCards, { "forecast": pollenData?.forecast, "date": pollenData?.date, "data-astro-cid-j7pv25f6": true })} </section> </main> ${renderComponent($$result2, "Footer", $$Footer, { "data-astro-cid-j7pv25f6": true })} ` })} `;
}, "/Users/sebacure/Desktop/proyectos/pena-polen/src/pages/index.astro", void 0);

const $$file = "/Users/sebacure/Desktop/proyectos/pena-polen/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
