import { MapContainer, TileLayer, Polygon, Marker, Popup } from "react-leaflet";
import { markerPositions, penaflorCoords } from "./utils";

import "leaflet/dist/leaflet.css";


export default function MapaPenaflor() {
  // Calcular el centro geográfico de Peñaflor basado en las coordenadas
  const centerLat = penaflorCoords[0].reduce((sum, coord) => sum + coord[0], 0) / penaflorCoords[0].length;
  const centerLng = penaflorCoords[0].reduce((sum, coord) => sum + coord[1], 0) / penaflorCoords[0].length;

  return (
      <MapContainer 
      center={[centerLat, centerLng] as [number, number]} 
      zoom={14} 
      style={{ height: "500px", width: "100%" }}
      scrollWheelZoom={false}
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
          fillOpacity: 0.2,
          weight: 4
        }} 
      />
      
      {/* Múltiples marcadores con diferentes colores */}
      {markerPositions.map((marker, index) => (
        <Marker 
          key={index} 
          position={marker.position} 
          icon={marker.icon}
        >
          <Popup>   
            <div>
              <strong style={{color: marker.colorHex}}>
                {marker.title}
              </strong>
              <br />
              <em>Color: {marker.color}</em>
              <br />
              {marker.description}
              <br />
              <small>
                Lat: {marker.position[0].toFixed(6)}<br />
                Lng: {marker.position[1].toFixed(6)}
              </small>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>

  );
}
