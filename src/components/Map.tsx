import React, { useState } from "react";
import { TileLayer, MapContainer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet";
import Pin from './Pin';
import CityList from "./CityList";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png"
});

const center = { lat: 39.3999, lng: 8.2245 };
const amsterdam = { lat: 52.377956, lng: 4.897070 };


export default function Map() {

  const [pinPosition, setPinPosition] = useState<LatLngExpression>([39.3999, 8.2245]);
  const [score, setScore] = useState(parseInt(localStorage.getItem('score') ?? '1500'));
  const [isNextButtonEnabled, setIsNextButtonEnabled] = useState(false);

  const handlePinMoved = (position: LatLngExpression) => {
    setPinPosition(position);
    console.log("pin to move to", position);
  }

  const handleSubmit = () => {
    const R = 6371e3; // Earth's radius in meters
    const [lat1, lng1] = pinPosition as [number, number];
    const { lat: lat2, lng: lng2 } = amsterdam;
    const phi1 = (lat1 * Math.PI) / 180; // Convert latitudes to radians
    const phi2 = (lat2 * Math.PI) / 180;
    const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
    const deltaLambda = ((lng2 - lng1) * Math.PI) / 180;

    const a =
      Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
      Math.cos(phi1) *
        Math.cos(phi2) *
        Math.sin(deltaLambda / 2) *
        Math.sin(deltaLambda / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c / 1000; // Distance in km
    console.log("Distance from Amsterdam:", distance);

    const newScore = score - distance;
    setScore(newScore);

    setIsNextButtonEnabled(true);
  };

   return (
    <>
    <MapContainer
      style={{ height: "80vh", width: "80vw" }}
      center={center}
      zoom={4}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png"
      />
      <Pin initialPosition={pinPosition} onPositionChanged={handlePinMoved} />
    </MapContainer>
    <button onClick={handleSubmit}>Submit</button>
    <CityList score={Math.round(score)} isNextButtonEnabled={isNextButtonEnabled} />
    </>
  );
} 
