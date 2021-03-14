import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Marker, Popup } from 'react-leaflet';
import { FiArrowRight, FiPlus } from 'react-icons/fi';

import api from '../../services/api';

import Map from '../../components/Map';

import happyMapIcon from '../../components/Map/happyMapIcon';
import mapMarkerImg from '../../assets/images/map-marker.svg';

import './styles.css';

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

const OrphanagesMap: React.FC = () => {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useEffect(() => {
    api
      .get('/orphanages')
      .then(response => {
        console.log(response.data);
        setOrphanages(response.data);
      });
  }, []);

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy"/>

          <h2>Escolha um orfanato no mapa.</h2>
          <p>Muitas crianças estão esperando a sua visita {':)'}</p>
        </header>

        <footer>
          <strong>Porto Velho</strong>
          <span>Rondônia</span>
        </footer>
      </aside>

      <Map>
        {orphanages.map(orphanage => (
          <Marker 
            key={orphanage.id}
            position={[
              orphanage.latitude,
              orphanage.longitude,
            ]}
            icon={happyMapIcon}
          >
            <Popup 
              closeButton={false} 
              minWidth={240} 
              maxWidth={240}
              className="map-popup"
            >
              {orphanage.name}
              <Link to={`/orphanage/${orphanage.id}`}>
                <FiArrowRight size={20} color="#FFF" />
              </Link>
            </Popup>
          </Marker>
        ))}
      </Map>

      <Link to="/orphanage/create" className="create-orphanages">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  );
}

export default OrphanagesMap;