import L from "leaflet";

const createColorIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="
      background-color: ${color};
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });
};



const penaflorCoords: [number, number][][] = [
  [
    [-33.605, -70.92],
    [-33.58, -70.87],
    [-33.61, -70.84],
    [-33.64, -70.88],
    [-33.605, -70.92],
  ],
];

const redIcon = createColorIcon('#ef4444');
/* const blueIcon = createColorIcon('#3b82f6');
const greenIcon = createColorIcon('#22c55e');
const yellowIcon = createColorIcon('#f59e0b');
const purpleIcon = createColorIcon('#8b5cf6');
const orangeIcon = createColorIcon('#f97316'); */


// Array de posiciones con diferentes datos
const markerPositions = [
  {
    position: [-33.61124501, -70.89116629] as [number, number],
    icon: redIcon,
    title: "Zona de Alto Riesgo",
    description: "Niveles de polen muy altos - Evitar actividades al aire libre",
    color: "Rojo",
    colorHex: "#ef4444"
  },
  {
    position: [-33.6109172, -70.88590998] as [number, number],
    icon: redIcon,
    title: "Zona de Alto Riesgo",
    description: "Niveles de polen muy altos - Evitar actividades al aire libre",
    color: "Rojo",
    colorHex: "#ef4444"
  },
  {
    position: [-33.61010982, -70.86431736] as [number, number],
    icon: redIcon,
    title: "Zona de Alto Riesgo",
    description: "Niveles de polen muy altos - Evitar actividades al aire libre",
    color: "Rojo",
    colorHex: "#ef4444"
  },
  {
    position: [-33.59981877, -70.86709138] as [number, number],
    icon: redIcon,
    title: "Zona de Alto Riesgo",
    description: "Niveles de polen muy altos - Evitar actividades al aire libre",
    color: "Rojo",
    colorHex: "#ef4444"
  },
  {
    position: [-33.59775675, -70.87698316] as [number, number],
    icon: redIcon,
    title: "Zona de Alto Riesgo",
    description: "Niveles de polen muy altos - Evitar actividades al aire libre",
    color: "Rojo",
    colorHex: "#ef4444"
  },
  {
    position: [-33.60283196, -70.89842473] as [number, number],
     icon: redIcon,
    title: "Zona de Alto Riesgo",
    description: "Niveles de polen muy altos - Evitar actividades al aire libre",
    color: "Rojo",
    colorHex: "#ef4444"
  }
];
export { markerPositions, createColorIcon, penaflorCoords };