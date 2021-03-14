import React, { useState } from 'react';
import { Marker, useMapEvents } from 'react-leaflet';

import happyMapIcon from '../Map/happyMapIcon';

export interface PositionProps {
  lat: number;
  lng: number;
}

interface MapMarkerProps {
  onPosition(position: PositionProps): void;
}

const MapMarker: React.FC<MapMarkerProps> = ({ onPosition }) => {
  const [position, setPosition] = useState<PositionProps>();

  const map = useMapEvents({
    click(event) {
      map.locate();

      const { lat, lng } = event.latlng;

      setPosition({
        lat: lat,
        lng: lng,
      });

      onPosition({ lat, lng });
    }
  })

  return (
    <>
      {position && (
        <Marker 
          interactive={false} 
          icon={happyMapIcon} 
          position={[position.lat, position.lng]} 
        />
      )}
    </>
  );
}

export default MapMarker;