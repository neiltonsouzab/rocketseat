const express = require('express');
const cors = require('cors');
const { uuid } = require('uuidv4');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.post('/repositories', (request, response) => {
  const { title, url, techs } = request.body;
  
  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  }

  repositories.push(repository)

  return response.json(repository)
});

app.get('/repositories', (request, response) => {
  return response.json(repositories)
});

app.put('/repositories/:id', (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repository = repositories.find(repo => repo.id === id);

  if (!repository) {
    return response.status(400).send();
  }

  Object.assign(repository, { title, url, techs });

  return response.json(repository);
});

app.delete('/repositories/:id', (request, response) => {
  const { id } = request.params;
  const repository = repositories.find(repo => repo.id === id);

  if (!repository) {
    return response.status(400).send();
  }

  const index = repositories.findIndex(r => r.id === id);
  repositories.splice(index, 1);

  return response.status(204).send();
});

app.post('/repositories/:id/like', (request, response) => {
  const { id } = request.params;
  const repository = repositories.find(repo => repo.id === id);

  if (!repository) {
    return response.status(400).send();
  }

  repository.likes += 1;

  return response.json(repository);
});

module.exports = app;