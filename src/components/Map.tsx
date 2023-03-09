import React from "react";
import { TileLayer, MapContainer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet";
import { useState } from "react";
import Pin from './Pin';

L.Marker.prototype.options.icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png"
});

const center = { lat: 39.3999, lng: 8.2245 };

export default function Map() {
  function onEachFeature(feature: any, layer: L.Layer) {
    if (feature.properties) {
      const { popupContent } = feature.properties;
      layer.bindPopup(popupContent);
    }
  }

  const [pinPosition, setPinPosition] = useState<LatLngExpression>([39.3999, 8.2245]);

  const handlePinPositionChanged = (position: LatLngExpression) => {
    setPinPosition(position);
  };

  return (
    <MapContainer
      style={{ height: "80vh", width: "80vw" }}
      center={center}
      zoom={4}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png"
      />
      <Pin initialPosition={pinPosition} onPositionChanged={handlePinPositionChanged} />
    </MapContainer>
  );
}
