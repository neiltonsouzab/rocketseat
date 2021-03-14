import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Marker } from 'react-leaflet';
import { FiClock, FiInfo } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

import Sidebar from '../../components/Sidebar';
import PrimaryButton from '../../components/PrimaryButton';
import Map from '../../components/Map';
import happyMapIcon from '../../components/Map/happyMapIcon';

import './styles.css';
import api from '../../services/api';

interface Orphanage {
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: Array<{
    id: number;
    url: string;
  }>;
}

interface RouteParams {
  id: string;
}

const OrphanageShow: React.FC = () => {
  const routeParams = useParams<RouteParams>();
  const [orphanage, setOrphanage] = useState<Orphanage>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  

  useEffect(() => {
    api
      .get(`/orphanages/${routeParams.id}`)
      .then(response => {
        setOrphanage(response.data);
      });
  }, [routeParams]);

  if (!orphanage) {
    return <p>Carregando...</p>
  }

  return (
    <div id="page-orphanage">
      <Sidebar />

      <main>
        <div className="orphanage-details">
          <img src={orphanage.images[activeImageIndex].url} alt={orphanage.name} />

          <div className="images">
            {orphanage.images.map((image, index) => (
              <button 
                key={image.id} 
                className={activeImageIndex === index ? 'active' : ''} 
                type="button"
                onClick={() => setActiveImageIndex(index)}
              >
                <img src={image.url} alt={orphanage.name} />
              </button>
            ))}
          </div>
          
          <div className="orphanage-details-content">
            <h1>{orphanage.name}</h1>
            <p>{orphanage.about}</p>

            <div className="map-container">
              <Map 
                interactive={false}
                center={[orphanage.latitude, orphanage.longitude]} 
                zoom={16} 
                style={{ width: '100%', height: 280 }}
              >
                <Marker 
                  interactive={false} 
                  icon={happyMapIcon} 
                  position={[orphanage.latitude, orphanage.longitude]} 
                />
              </Map>

              <footer>
                <a 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}>
                    Ver rotas no Google Maps
                </a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphanage.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {orphanage.opening_hours}
              </div>
              {orphanage.open_on_weekends ? (
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                  Atendemos <br />
                  fim de semana
                </div>
              ) : (
                <div className="open-on-weekends dont-open">
                  <FiInfo size={32} color="#FF669D" />
                  Não atendemos <br />
                  fim de semana
                </div>
              )}
            </div>

            <PrimaryButton type="button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </PrimaryButton>
          </div>
        </div>
      </main>
    </div>
  );
}

export default OrphanageShow;