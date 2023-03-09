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
    const { latlng } = event.target;
    const newPosition: LatLngExpression = latlng;
    setPosition(newPosition);
    onPositionChanged && onPositionChanged(newPosition);
  };

  return (
    <Marker draggable={true} position={position} eventHandlers={{ dragend: handleDragEnd }}>
      <Popup>Drag me to a new location!</Popup>
    </Marker>
  );
};

export default Pin;
