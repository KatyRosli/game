import React, { useState } from "react";
import { TileLayer, MapContainer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet";
import Pin from './Pin';
import { PinPosition } from "../types/MapTypes";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png"
});

const center = { lat: 39.3999, lng: 8.2245 };

interface MapProps {
  updatedPinnedPosition: (pinnedPosition: PinPosition) => void
}

const GameMap = ({ updatedPinnedPosition }: MapProps) => {

  const [pinPosition, setPinPosition] = useState<LatLngExpression>([39.3999, 8.2245]);

  const handlePinMoved = (pinPosition: LatLngExpression) => {
    setPinPosition(pinPosition);
    console.log("pin to move to", pinPosition);
  }

  const handleSubmit = () => {
    const [lat, lng] = pinPosition as [number, number]
    updatedPinnedPosition({lat: lat, lng: lng});
  }

   return (
    <div>
      <div className='btn__container'>
    <button className='btn__submit'onClick={handleSubmit}>Submit Pin Location</button>
    </div>
    <div className='map'>
    <MapContainer
      className='map__worldmap'
      style={{ height: "60vh", width: "80vw" }}
      center={center}
      zoom={4}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png"
      />
      <Pin initialPosition={pinPosition} onPositionChanged={handlePinMoved} />
    </MapContainer>
    </div>
    </div>
  );
}

export default GameMap