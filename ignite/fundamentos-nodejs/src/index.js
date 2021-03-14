const express = require('express');

const app = express();

app.use(express.json());

const courses = [];

app.get('/courses', (request, response) => {
  return response.json(courses);
});

app.post('/courses', (request, response) => {
  const { name } = request.body;

  const course = {
    id: courses.length + 1,
    name,
  };

  courses.push(course);

  return response.json(course);
});

app.put('/courses/:id', (request, response) => {
  const { id } = request.params;
  const { name } = request.body;

  const index = courses.findIndex(findCourse => findCourse.id == id);

  const updatedCourse = {
    ...courses[index],
    name,
  };

  courses[index] = updatedCourse;

  return response.json(updatedCourse);
});

app.delete('/courses/:id', (request, response) => {
  const { id } = request.params;

  const index = courses.findIndex(findCourse => findCourse.id == id);

  courses.splice(index, 1);

  return response.json();
});

app.listen(3333);