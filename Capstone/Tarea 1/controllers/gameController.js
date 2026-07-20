const { Game } = require('../models/index');

// POST /game - Crear un nuevo juego
exports.createGame = async (req, res, next) => {
  try {
    const { name, description, genre, platform } = req.body;
    
    if (!name || !description || !genre || !platform) {
      const error = new Error('Todos los campos (name, description, genre, platform) son requeridos');
      error.statusCode = 400;
      throw error;
    }

    const game = await Game.create({
      name,
      description,
      genre,
      platform
    });
    
    // Respuesta según formato del ejemplo
    res.status(201).json({
      id: game.id,
      name: game.name,
      description: game.description,
      genre: game.genre,
      platform: game.platform
    });
  } catch (error) {
    next(error);
  }
};

// GET /game/:id - Obtener detalles de un juego por ID
exports.getGame = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    if (!id || isNaN(parseInt(id))) {
      const error = new Error('ID de juego inválido');
      error.statusCode = 400;
      throw error;
    }

    const game = await Game.findByPk(id);
    
    if (!game) {
      const error = new Error('Juego no encontrado');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      id: game.id,
      name: game.name,
      description: game.description,
      genre: game.genre,
      platform: game.platform
    });
  } catch (error) {
    next(error);
  }
};

// PUT /game/:id - Actualizar completamente un juego
exports.updateGame = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, genre, platform } = req.body;
    
    if (!id || isNaN(parseInt(id))) {
      const error = new Error('ID de juego inválido');
      error.statusCode = 400;
      throw error;
    }

    // Validar que vengan todos los campos según ejemplo
    if (!name || !description || !genre || !platform) {
      const error = new Error('Todos los campos (name, description, genre, platform) son requeridos para actualización completa');
      error.statusCode = 400;
      throw error;
    }

    const game = await Game.findByPk(id);
    
    if (!game) {
      const error = new Error('Juego no encontrado');
      error.statusCode = 404;
      throw error;
    }

    // Actualizar todos los campos según ejemplo
    await game.update({
      name,
      description,
      genre,
      platform
    });

    res.status(200).json({
      name: game.name,
      description: game.description,
      genre: game.genre,
      platform: game.platform
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /game/:id - Eliminar un juego
exports.deleteGame = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    if (!id || isNaN(parseInt(id))) {
      const error = new Error('ID de juego inválido');
      error.statusCode = 400;
      throw error;
    }

    const game = await Game.findByPk(id);
    
    if (!game) {
      const error = new Error('Juego no encontrado');
      error.statusCode = 404;
      throw error;
    }

    await game.destroy();

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

// PATCH /game/:id - Actualizar parcialmente un juego
exports.partialUpdateGame = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    if (!id || isNaN(parseInt(id))) {
      const error = new Error('ID de juego inválido');
      error.statusCode = 400;
      throw error;
    }

    const game = await Game.findByPk(id);
    
    if (!game) {
      const error = new Error('Juego no encontrado');
      error.statusCode = 404;
      throw error;
    }

    // Validar que al menos un campo venga en el update
    if (Object.keys(updateData).length === 0) {
      const error = new Error('Debe proporcionar al menos un campo para actualizar');
      error.statusCode = 400;
      throw error;
    }

    // Validar que solo se actualicen campos permitidos
    const allowedFields = ['name', 'description', 'genre', 'platform'];
    const invalidFields = Object.keys(updateData).filter(field => !allowedFields.includes(field));
    
    if (invalidFields.length > 0) {
      const error = new Error(`Campos no permitidos: ${invalidFields.join(', ')}`);
      error.statusCode = 400;
      throw error;
    }

    // Actualizar solo los campos proporcionados
    await game.update(updateData);

    // Recargar el juego actualizado
    const updatedGame = await Game.findByPk(id);

    res.status(200).json({
      id: updatedGame.id,
      name: updatedGame.name,
      description: updatedGame.description,
      genre: updatedGame.genre,
      platform: updatedGame.platform
    });
  } catch (error) {
    next(error);
  }
};