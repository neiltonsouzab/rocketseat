import React from 'react';
import { 
  MapContainer as LeafletMap, 
  MapContainerProps as LeafletMapProps, 
  TileLayer 
} from 'react-leaflet';


interface MapProps extends LeafletMapProps {
  interactive?: boolean;
}

const Map: React.FC<MapProps> = ({ children, interactive = true, ...rest }) => {
  return (
    <LeafletMap
      center={[
        -8.7378553,
        -63.8995221
      ]}
      zoom={15}
      style={{
        width: '100%',
        height: '100%',
      }}
      dragging={interactive}
      touchZoom={interactive}
      zoomControl={interactive}
      scrollWheelZoom={interactive}
      doubleClickZoom={interactive}
      {...rest}
    >
      <TileLayer 
        url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />

      {children}
    </LeafletMap>
  );
}

export default Map;