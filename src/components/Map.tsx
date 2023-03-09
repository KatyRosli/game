import React from "react";
import { TileLayer, MapContainer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png"
});

const center = { lat: 56.2639, lng: 9.5018 };

export default function Map() {
  function onEachFeature(feature: any, layer: L.Layer) {
    if (feature.properties) {
      const { popupContent } = feature.properties;
      layer.bindPopup(popupContent);
    }
  }
  return (
    <MapContainer
      style={{ height: "100vh", width: "100vw" }}
      center={center}
      zoom={2}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png"
      />
      <Marker position={[56.2639, 9.5018]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}