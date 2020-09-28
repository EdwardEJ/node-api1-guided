// import express from 'express' //ES2015 modules, not supported by default by all versions of node

const express = require('express'); //CommonJS modules

const server = express();

//need to teach express how to read JSON from req.body
server.use(express.json());

server.get('/', (req, res) => {
  //request + response
  //ALWAYS return the correct http status based on the operation performed
  res.status(200).json({ hello: 'Node 34' });
});

let lessons = [
  { id: 1, name: 'introduction to node' },
  { id: 2, name: 'introduction to express' },
];

let nextId = 3;

server.get('/lessons', (req, res) => {
  res.status(200).json({ data: { lessons } });
});

//POST /lessons -> add a lesson to the lessons array -> respond with lessons array
server.post('/lessons', (req, res) => {
  //client will axios.post('api/lessons', data)
  const data = req.body;
  lessons.push({ id: nextId++, ...data });

  res.status(201).json({ data: { lessons } });
});

server.put('/lessons/:id', (req, res) => {
  //find the lesson
  //anything read from the URL will be a string. Need to convert to number
  const id = Number(req.params.id);
  const changes = req.body;
  const found = lessons.find((l) => l.id === id);

  if (found) {
    Object.assign(found, changes);

    res.status(201).json({ data: { lessons } });
  } else {
    res.status(404).json({ message: 'Lesson not found' });
  }
  //update the lesson with data received in the body
  //return lessons array
});

server.delete('/lessons/:id', (req, res) => {
  const id = Number(req.params.id);

  lessons = lessons.filter((l) => l.id !== id);

  res.status(200).json({ data: lessons });
});

const port = 5000;
server.listen(port, () => console.log('API running'));
