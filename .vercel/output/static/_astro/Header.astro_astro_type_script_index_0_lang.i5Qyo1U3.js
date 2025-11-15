document.addEventListener("DOMContentLoaded",()=>{const d=document.getElementById("mobile-menu-button"),c=document.getElementById("mobile-menu");if(!d||!c)return;function f(){c?.classList.add("hidden");const e=document.getElementById("hamburger-icon"),t=document.getElementById("close-icon");e?.classList.remove("hidden"),t?.classList.add("hidden"),d?.setAttribute("aria-expanded","false")}function I(){c?.classList.remove("hidden");const e=document.getElementById("hamburger-icon"),t=document.getElementById("close-icon");e?.classList.add("hidden"),t?.classList.remove("hidden"),d?.setAttribute("aria-expanded","true")}d.addEventListener("click",()=>{c.classList.contains("hidden")?I():f()}),document.addEventListener("click",e=>{const t=e.target;t instanceof Node&&!c.contains(t)&&!d.contains(t)&&(c.classList.contains("hidden")||f())});const v=document.getElementById("theme-toggle"),p=document.getElementById("theme-toggle-light-icon"),b=document.getElementById("theme-toggle-dark-icon");function m(){const e=document.documentElement.classList.contains("dark");console.log("Updating icons, isDark:",e),!(!p||!b)&&(p.classList.toggle("hidden",!e),b.classList.toggle("hidden",e))}const k=localStorage.getItem("color-theme")==="light";if(document.documentElement.classList.toggle("light",k),document.documentElement.classList.toggle("dark",!k),m(),!v)return;v.addEventListener("click",()=>{if(console.log("Toggle clicked, current classes:",document.documentElement.className),document.documentElement.classList.contains("dark")){document.documentElement.classList.remove("dark"),document.documentElement.classList.add("light"),localStorage.setItem("color-theme","light"),console.log("Saved theme: light"),m();return}document.documentElement.classList.remove("light"),document.documentElement.classList.add("dark"),localStorage.setItem("color-theme","dark"),console.log("Saved theme: dark"),m()});const y=document.getElementById("notifications-button"),r=document.getElementById("notifications-dropdown"),L=document.getElementById("notification-badge"),g=document.getElementById("notifications-list"),B=document.getElementById("mark-all-read");function u(){try{const e=localStorage.getItem("pollen-notifications");return e?JSON.parse(e):[]}catch(e){return console.error("Error al cargar notificaciones:",e),[]}}function E(e){try{localStorage.setItem("pollen-notifications",JSON.stringify(e))}catch(t){console.error("Error al guardar notificaciones:",t)}}function M(e){const n=Date.now()-e,o=Math.floor(n/6e4),s=Math.floor(n/36e5),i=Math.floor(n/864e5);return o<1?"Ahora mismo":o<60?`Hace ${o} min`:s<24?`Hace ${s}h`:i===1?"Ayer":`Hace ${i} días`}function l(){const e=u();if(e.filter(n=>!n.read).length>0?L?.classList.remove("hidden"):L?.classList.add("hidden"),!!g){if(e.length===0){g.innerHTML=`
        <div class="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
          <svg class="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <p class="text-sm">No hay notificaciones</p>
        </div>
      `;return}g.innerHTML=e.sort((n,o)=>o.timestamp-n.timestamp).map(n=>`
        <div class="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0 ${n.read?"":"bg-indigo-50/50 dark:bg-indigo-900/10"}">
          <div class="flex items-start space-x-3">
            <div class="flex-shrink-0">
              <div class="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-500 flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between">
                <p class="text-sm font-medium text-gray-900 dark:text-white">
                  ${n.title}
                </p>
                ${n.read?"":'<div class="ml-2 flex-shrink-0 w-2 h-2 bg-indigo-500 rounded-full"></div>'}
              </div>
              <p class="mt-1 text-sm text-gray-600 dark:text-gray-300">
                ${n.message}
              </p>
              ${n.levels?`
                <div class="mt-2 flex flex-wrap gap-1">
                  ${n.levels.map(o=>`
                    <span class="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${o.level==="ALTOS"?"bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300":o.level==="MEDIOS"?"bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300":"bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"}">
                      ${o.type}: ${o.level}
                    </span>
                  `).join("")}
                </div>
              `:""}
              <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">
                ${M(n.timestamp)}
              </p>
            </div>
          </div>
        </div>
      `).join("")}}y?.addEventListener("click",e=>{e.stopPropagation(),r?.classList.contains("hidden")?(r?.classList.remove("hidden"),l()):r?.classList.add("hidden")}),document.addEventListener("click",e=>{const t=e.target;t instanceof Node&&!r?.contains(t)&&!y?.contains(t)&&r?.classList.add("hidden")}),B?.addEventListener("click",()=>{const t=u().map(n=>({...n,read:!0}));E(t),l()});async function x(){try{const t=await(await fetch("/api/penaflor?action=latest")).json();if(t.success&&t.data){const n=localStorage.getItem("last-pollen-check"),o=new Date(t.data.date).getTime();if(!n||o>parseInt(n)){const s=u();if(!s.some(a=>a.recordId===t.data.id)){const a={id:Date.now(),recordId:t.data.id,title:"¡Niveles de polen actualizados!",message:`Nuevos datos disponibles para ${t.data.city}`,timestamp:Date.now(),read:!1,levels:t.data.levels?.slice(0,3)||[]};s.unshift(a),s.length>10&&s.pop(),E(s),l(),localStorage.setItem("last-pollen-check",o.toString())}}}}catch(e){console.error("Error al verificar actualizaciones:",e)}}x(),setInterval(x,3e4),l();const w=document.querySelectorAll(".scroll-link");function h(){const e=window.scrollY+100,t=["hero","mapa","historial","forecast"];let n="hero";for(const o of t){const s=document.getElementById(o);if(!s)continue;const i=s.getBoundingClientRect().top+window.scrollY,a=i+s.clientHeight;if(e>=i&&e<a){n=o;break}}w.forEach(o=>{const i=o.getAttribute("data-section")===n;o.classList.remove("bg-white","light:bg-white","dark:bg-gray-700","bg-indigo-50/50","dark:bg-indigo-900/20"),o.classList.remove("font-semibold","font-medium"),i?o.classList.add("bg-white","light:bg-white","dark:bg-gray-700","font-semibold"):o.classList.add("font-medium")})}w.forEach(e=>{e.addEventListener("click",t=>{t.preventDefault();const n=e.getAttribute("data-section");if(!n)return;const o=document.getElementById("mobile-menu");if(o&&!o.classList.contains("hidden")){o.classList.add("hidden");const i=document.getElementById("hamburger-icon"),a=document.getElementById("close-icon");i?.classList.remove("hidden"),a?.classList.add("hidden"),document.getElementById("mobile-menu-button")?.setAttribute("aria-expanded","false")}const s=document.getElementById(n);if(s){const a=s.getBoundingClientRect().top+window.scrollY-90;window.scrollTo({top:a,behavior:"smooth"}),setTimeout(()=>{h()},100)}})}),window.addEventListener("scroll",h,{passive:!0}),h()});
