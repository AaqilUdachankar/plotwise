import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { statusLabel, typeLabel } from "../utils/format";

// Fix default marker icon paths (Vite + Leaflet asset resolution quirk)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const TYPE_COLORS = {
  metro: "#1E9E5A",
  highway: "#D9A441",
  railway: "#3B82F6",
  airport: "#C2542E",
  industrial: "#7C3AED",
  it_park_sez: "#0F5E35",
  township: "#DB2777",
  other: "#64748B",
};

function iconFor(type) {
  const color = TYPE_COLORS[type] || "#64748B";
  return L.divIcon({
    className: "",
    html: `<div style="width:16px;height:16px;border-radius:50%;background:${color};border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.35)"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
}

export default function MapView({ city, areas = [], projects = [], height = 420 }) {
  const center = [city.latitude, city.longitude];

  return (
    <div className="overflow-hidden rounded-xl2 border border-border shadow-soft" style={{ height }}>
      <MapContainer center={center} zoom={11} style={{ width: "100%", height: "100%" }} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <CircleMarker center={center} radius={6} pathOptions={{ color: "#0F172A", fillColor: "#0F172A", fillOpacity: 1 }}>
          <Popup>
            <strong>{city.name}</strong>
            <br />
            City center
          </Popup>
        </CircleMarker>

        {areas.map((area) => (
          <CircleMarker
            key={area._id}
            center={[area.latitude, area.longitude]}
            radius={8}
            pathOptions={{ color: "#1E9E5A", fillColor: "#1E9E5A", fillOpacity: 0.85 }}
          >
            <Popup>
              <strong>{area.name}</strong>
              <br />
              {area.analysis ? `Investment Score: ${area.analysis.totalScore}/100` : "Area"}
            </Popup>
          </CircleMarker>
        ))}

        {projects.map((p) => (
          <Marker key={p._id} position={[p.latitude, p.longitude]} icon={iconFor(p.type)}>
            <Popup>
              <div style={{ fontSize: 13 }}>
                <strong>{p.name}</strong>
                <br />
                {typeLabel(p.type)} &middot; {statusLabel(p.status)}
                <br />
                Expected: {p.estimatedCompletion}
                <br />
                Impact: {p.impactLevel}
                <br />
                <a href={p.sourceUrl} target="_blank" rel="noreferrer">Source</a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
