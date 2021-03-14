import React, { useState, useEffect } from "react";
import { FaHeart, FaTrash } from 'react-icons/fa';

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [techs, setTechs] = useState('');


  useEffect(() => {
    async function loadRepositories() {
      const response = await api.get('repositories');
      const data = response.data.map(repository => ({
        ...repository,
        techs: repository.techs.join(','),
        liked: false,
      }));

      setRepositories(data);
    }

    loadRepositories();
  }, [])

  async function handleAddRepository(e) {
    e.preventDefault();

    const response = await api.post('repositories', {
      title,
      url,
      techs: techs.split(',')
    })

    setRepositories([
      ...repositories,
      response.data
    ])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(repository => repository.id !== id))
  }

  async function handleToLike({ id, liked }) {
    if (!liked) {
      await api.post(`repositories/${id}/like`);
  
      const data = repositories.map(repository => {
        if (id === repository.id) {
          return {
            ...repository,
            liked: true,
            likes: repository.likes + 1,
          }
        }
  
        return repository;
      })
  
      setRepositories(data);
    }
  }

  return (
    <div className="container">
      <h1>
        GoRepo
      </h1>

      <form onSubmit={handleAddRepository}>
        <input type="text" name="title" placeholder="Título" onChange={e => setTitle(e.target.value)} />
        <input type="text" name="url" placeholder="URL" onChange={e => setUrl(e.target.value)}/>
        <input type="text" name="techs" placeholder="Tecnologias" onChange={e => setTechs(e.target.value)}/>

        <button onClick={handleAddRepository}>Adicionar</button>
      </form>

      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            <div>
              <strong>{repository.title}</strong>
              <span>{repository.techs}</span>
              <a href={repository.url}>{repository.url}</a>
              <button title="Gostei" onClick={() => handleToLike(repository)}>
                {repository.likes}
                <FaHeart size={16} color={repository.liked ? '#c70039' : '#888'} />
              </button>
            </div>

            <button title="Excluir" onClick={() => handleRemoveRepository(repository.id)}>
              <FaTrash size={32} color="#7159C1"  />
            </button>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default App;
