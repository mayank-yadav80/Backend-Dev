const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Example in-memory data
let users = [
  { id: 1, name: 'Alice', role: 'admin' },
  { id: 2, name: 'Bob', role: 'user' }
];

// GET: fetch all users
app.get('/users', (req, res) => {
  res.json(users);
});

// GET: fetch single user by ID
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  user ? res.json(user) : res.status(404).send('User not found');
});

// POST: create new user
app.post('/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    role: req.body.role
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT: replace entire user object
app.put('/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('User not found');

  users[index] = {
    id: parseInt(req.params.id),
    name: req.body.name,
    role: req.body.role
  };
  res.json(users[index]);
});

// PATCH: update part of a user object
app.patch('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('User not found');

  if (req.body.name) user.name = req.body.name;
  if (req.body.role) user.role = req.body.role;

  res.json(user);
});

// DELETE: remove a user
app.delete('/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('User not found');

  const deleted = users.splice(index, 1);
  res.json(deleted[0]);
});

// Start server
app.listen(8000, () => {
  console.log('Server running on http://localhost:3000');
});