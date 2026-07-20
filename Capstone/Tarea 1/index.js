const express = require('express');

const app = express();
const PORT = 3001;

// Base de datos simple en memoria 
let games = [];
let nextId = 1;

// Middleware
app.use(express.json());

// 1. GET /health - Verificar estado del servidor
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Game backend is running' 
  });
});

// 2. POST /game - Crear un nuevo juego
app.post('/game', (req, res) => {
  const { name, description, genre, platform } = req.body;
  
  // Validar campos requeridos
  if (!name || !description || !genre || !platform) {
    return res.status(400).json({
      error: 'Todos los campos (name, description, genre, platform) son requeridos'
    });
  }

  const newGame = {
    id: nextId++,
    name,
    description,
    genre,
    platform
  };

  games.push(newGame);
  
  
  res.status(201).json({
    id: newGame.id,
    name: newGame.name,
    description: newGame.description,
    genre: newGame.genre,
    platform: newGame.platform
  });
});

// 3. GET /game/:id - Obtener detalles de un juego por ID
app.get('/game/:id', (req, res) => {
  const id = parseInt(req.params.id);
  
  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID de juego inválido' });
  }

  const game = games.find(g => g.id === id);
  
  if (!game) {
    return res.status(404).json({ error: 'Juego no encontrado' });
  }

  res.status(200).json({
    id: game.id,
    name: game.name,
    description: game.description,
    genre: game.genre,
    platform: game.platform
  });
});

// 4. PUT /game/:id - Actualizar completamente un juego
app.put('/game/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, description, genre, platform } = req.body;
  
  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID de juego inválido' });
  }

  // Validar que vengan todos los campos
  if (!name || !description || !genre || !platform) {
    return res.status(400).json({
      error: 'Todos los campos (name, description, genre, platform) son requeridos para actualización completa'
    });
  }

  const index = games.findIndex(g => g.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Juego no encontrado' });
  }

  // Actualizar el juego
  games[index] = {
    id,
    name,
    description,
    genre,
    platform
  };

  res.status(200).json({
    name: games[index].name,
    description: games[index].description,
    genre: games[index].genre,
    platform: games[index].platform
  });
});

// 5. PATCH /game/:id - Actualizar parcialmente un juego
app.patch('/game/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updateData = req.body;
  
  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID de juego inválido' });
  }

  const index = games.findIndex(g => g.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Juego no encontrado' });
  }

  // Validar que al menos un campo venga en el update
  if (Object.keys(updateData).length === 0) {
    return res.status(400).json({ error: 'Debe proporcionar al menos un campo para actualizar' });
  }

  // Validar que solo se actualicen campos permitidos
  const allowedFields = ['name', 'description', 'genre', 'platform'];
  const invalidFields = Object.keys(updateData).filter(field => !allowedFields.includes(field));
  
  if (invalidFields.length > 0) {
    return res.status(400).json({ error: `Campos no permitidos: ${invalidFields.join(', ')}` });
  }

  // Actualizar solo los campos proporcionados
  games[index] = {
    ...games[index],
    ...updateData
  };

  res.status(200).json({
    id: games[index].id,
    name: games[index].name,
    description: games[index].description,
    genre: games[index].genre,
    platform: games[index].platform
  });
});

// 6. DELETE /game/:id - Eliminar un juego
app.delete('/game/:id', (req, res) => {
  const id = parseInt(req.params.id);
  
  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID de juego inválido' });
  }

  const index = games.findIndex(g => g.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Juego no encontrado' });
  }

  // Eliminar el juego
  games.splice(index, 1);

  res.status(204).send();
});

// Middleware de errores simple
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
  console.log('Endpoints disponibles:');
  console.log('   GET  /health              - Verificar estado del servidor');
  console.log('   POST /game                - Crear un nuevo juego');
  console.log('   GET  /game/:id            - Obtener juego por ID');
  console.log('   PUT  /game/:id            - Actualizar completamente');
  console.log('   PATCH /game/:id           - Actualizar parcialmente');
  console.log('   DELETE /game/:id          - Eliminar juego');
});