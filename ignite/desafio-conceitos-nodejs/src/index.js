const express = require('express');
const cors = require('cors');

const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers;

  const userAccountExists = users.find(findUser => findUser.username === username);

  if (!userAccountExists) {
    return response.status(404).json({ error: 'User not found.' });
  }


  request.user = userAccountExists;

  return next();
}

app.post('/users', (request, response) => {
  const { name, username } = request.body;

  const userAlreadyExists = users.find(findUser => findUser.username === username);

  if (userAlreadyExists) {
    return response.status(400).json({ error: 'User already exists.' });
  }

  const user = {
    id: uuidv4(),
    name,
    username,
    todos: [],
  };

  users.push(user);

  return response.status(201).json(user);
});

app.get('/todos', checksExistsUserAccount, (request, response) => {
  const { user } = request;

  return response.json(user.todos);
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  const { title, deadline } = request.body;
  const { user } = request;

  const todo = {
    id: uuidv4(),
    title,
    done: false,
    deadline: new Date(deadline),
    created_at: new Date(),
  };

  user.todos.push(todo);

  return response.status(201).json(todo);
});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  const { title, deadline } = request.body;
  const { id } = request.params;
  const { user } = request;

  const todo = user.todos.find(findTodo => findTodo.id === id);

  if (!todo) {
    return response.status(404).json({ error: 'Todo not found. '});
  }

  todo.title = title;
  todo.deadline = new Date(deadline);

  return response.json(todo);
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  const { id } = request.params;
  const { user } = request;

  const todo = user.todos.find(findTodo => findTodo.id === id);

  if (!todo) {
    return response.status(404).json({ error: 'Todo not found. '});
  }

  todo.done = true;

  return response.json(todo);
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  const { id } = request.params;
  const { user } = request;

  const todo = user.todos.find(findTodo => findTodo.id === id);

  if (!todo) {
    return response.status(404).json({ error: 'Todo not found. '});
  }

  user.todos.splice(todo, 1);

  return response.status(204).send();
});

module.exports = app;