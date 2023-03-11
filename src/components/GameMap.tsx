import React, { useState } from "react";
import { TileLayer, MapContainer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet";
import Pin from './Pin';
import { useMatchContext } from "../context/MatchContext";
import { ActionType } from "../reducers/MatchReducer";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png"
});

const center = { lat: 39.3999, lng: 8.2245 };

const GameMap = () => {

  const [pinPosition, setPinPosition] = useState<LatLngExpression>([39.3999, 8.2245]);
  const { dispatch } = useMatchContext();

  const handlePinMoved = (pinPosition: LatLngExpression) => {
    setPinPosition(pinPosition);
  }

  const handleSubmit = () => {
    const [lat, lng] = pinPosition as [number, number];
    dispatch({ type: ActionType.PIN_POSITION, payload: {lat: lat, lng: lng} });
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