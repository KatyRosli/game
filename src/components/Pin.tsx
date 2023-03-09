import { Marker, Popup } from 'react-leaflet';
import { useState } from 'react';
import { LatLngExpression } from 'leaflet';
import { DragEndEvent } from 'leaflet';

type PinProps = {
  initialPosition: LatLngExpression;
  onPositionChanged?: (position: LatLngExpression) => void;
};

const Pin = ({ initialPosition, onPositionChanged }: PinProps) => {
  const [position, setPosition] = useState<LatLngExpression>(initialPosition);

  const handleDragEnd = (event: DragEndEvent) => {
    console.log('hi', event.target);
    console.log('bye', event.target._latlng);
    const latlng  = event.target.getLatLng();
    const newPosition: LatLngExpression = [latlng.lat, latlng.lng];
    setPosition(newPosition);
    onPositionChanged && onPositionChanged(newPosition);
  };

  return (
    <>
    <Marker draggable={true} position={position} eventHandlers={{ dragend: handleDragEnd }}>
      <Popup>Drag me to a new location!</Popup>
    </Marker>
    </>
  );
};

export default Pin;
