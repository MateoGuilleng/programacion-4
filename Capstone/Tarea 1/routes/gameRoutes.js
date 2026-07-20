const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

// POST /game - Crear un nuevo juego
router.post('/', gameController.createGame);

// GET /game/:id - Obtener detalles de un juego por ID
router.get('/:id', gameController.getGame);

// PUT /game/:id - Actualizar completamente un juego
router.put('/:id', gameController.updateGame);

// PATCH /game/:id - Actualizar parcialmente un juego
router.patch('/:id', gameController.partialUpdateGame);

// DELETE /game/:id - Eliminar un juego
router.delete('/:id', gameController.deleteGame);

module.exports = router;