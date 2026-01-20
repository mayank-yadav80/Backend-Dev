const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let tasks = [];
let idCounter = 1;
app.post('/tasks', (req, res) => {
  const task = { id: idCounter++, text: req.body.text };
  tasks.push(task);
  res.status(201).json(task);
});


app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.put('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).send('Task not found');
  task.text = req.body.text;
  res.json(task);
});

app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter(t => t.id !== id);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`TODO API running at http://localhost:${port}`);
});
