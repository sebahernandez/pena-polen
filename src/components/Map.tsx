import { MapContainer, TileLayer, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const penaflorCoords: [number, number][][] = [
  [
    [-33.605, -70.92],
    [-33.58, -70.87],
    [-33.61, -70.84],
    [-33.64, -70.88],
    [-33.605, -70.92],
  ],
];

export default function MapaPeñaflor() {
  // Calcular el centro geográfico de Peñaflor basado en las coordenadas
  const centerLat = penaflorCoords[0].reduce((sum, coord) => sum + coord[0], 0) / penaflorCoords[0].length;
  const centerLng = penaflorCoords[0].reduce((sum, coord) => sum + coord[1], 0) / penaflorCoords[0].length;

  return (
      <MapContainer 
      center={[centerLat, centerLng] as [number, number]} 
      zoom={14} 
      style={{ height: "500px", width: "100%" }}
      scrollWheelZoom={true}
    >
      <TileLayer 
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polygon 
        positions={penaflorCoords} 
        pathOptions={{ 
          color: "#22c55e", 
          fillColor: "#22c55e", 
          fillOpacity: 0.3,
          weight: 4
        }} 
      />
    </MapContainer>

  );
}
