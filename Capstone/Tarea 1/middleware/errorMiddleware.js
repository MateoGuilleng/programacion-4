// Middleware para manejo de errores
const errorMiddleware = (error, req, res, next) => {
  // Establecer valores por defecto
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Error interno del servidor';
  const stack = process.env.NODE_ENV === 'development' ? error.stack : undefined;

  // Log del error
  console.error(`Error ${statusCode}: ${message}`);
  if (process.env.NODE_ENV === 'development') {
    console.error(error.stack);
  }

  // Tipos de errores comunes
  if (error.name === 'SequelizeValidationError') {
    return res.status(400).json({
      success: false,
      error: 'Error de validación',
      details: error.errors.map(err => ({
        field: err.path,
        message: err.message
      })),
      message: 'Error en los datos proporcionados'
    });
  }

  if (error.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({
      success: false,
      error: 'Conflicto de unicidad',
      message: 'El recurso ya existe'
    });
  }

  if (error.name === 'SequelizeForeignKeyConstraintError') {
    return res.status(400).json({
      success: false,
      error: 'Error de clave foránea',
      message: 'Referencia a recurso no válida'
    });
  }

  if (error.name === 'SequelizeDatabaseError') {
    return res.status(400).json({
      success: false,
      error: 'Error de base de datos',
      message: 'Error en la operación de base de datos'
    });
  }

  // Respuesta general de error
  res.status(statusCode).json({
    success: false,
    error: message,
    ...(stack && { stack: stack }),
    ...(error.details && { details: error.details })
  });
};

module.exports = errorMiddleware;