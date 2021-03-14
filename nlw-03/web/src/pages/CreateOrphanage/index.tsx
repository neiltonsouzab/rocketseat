import React, { useState, useCallback, FormEvent, ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';

import api from '../../services/api';
import Sidebar from '../../components/Sidebar';
import PrimaryButton from '../../components/PrimaryButton';
import Map from '../../components/Map';
import MapMarker, { PositionProps } from '../../components/MapMarker';

import './styles.css';

const CreateOrphanage: React.FC = () => {
  const history = useHistory();

  const [position, setPosition] = useState<PositionProps>({
    lat: 0,
    lng: 0,
  });
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const onSubmit = useCallback(async (event: FormEvent) => {
    event.preventDefault();

    const data = new FormData();
    data.append('name', name);
    data.append('about', about);
    data.append('instructions', instructions);
    data.append('latitude', String(position.lat));
    data.append('longitude', String(position.lng));
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));

    images.forEach(image => data.append('images', image));

    await api.post('/orphanages', data);

    alert('Cadastro realizado com sucesso!');

    history.push('/app');

  }, [
    name,
    about, 
    instructions, 
    position, 
    opening_hours, 
    open_on_weekends, 
    images, 
    history,
  ]);

  const handleSelectImages = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }

    const selectedImages = Array.from(event.target.files)

    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image);
    });

    setPreviewImages(selectedImagesPreview);
  }, []);

  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form className="create-orphanage-form" onSubmit={onSubmit}>
          <fieldset>
            <legend>Dados</legend>

            <Map 
              style={{ width: '100%', height: 280 }}
            >
              <MapMarker onPosition={position => setPosition(position)} />
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input 
                id="name" 
                value={name} 
                onChange={e => setName(e.target.value)} 
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea 
                id="about" 
                maxLength={300} 
                value={about}
                onChange={e => setAbout(e.target.value)}  
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map(image => (
                  <img key={image} src={image} alt={name} />
                ))}

                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>

              <input 
                multiple 
                type="file" 
                id="image[]"
                onChange={handleSelectImages}
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea 
                id="instructions" 
                value={instructions}
                onChange={e => setInstructions(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input 
                id="opening_hours"
                value={opening_hours}
                onChange={e => setOpeningHours(e.target.value)}  
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button 
                  type="button" 
                  className={open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(true)}
                >
                  Sim
                </button>
                <button 
                  type="button"
                  className={!open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <PrimaryButton type="submit">Confirmar</PrimaryButton>
        </form>
      </main>
    </div>
  );
}

export default CreateOrphanage;