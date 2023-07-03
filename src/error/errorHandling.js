exports.errorHandler = (err, req, res, next) => {
    console.error(err);
  
    // Verificar si el error tiene un código de estado asignado
    const statusCode = err.statusCode || 500;
  
    // Enviar respuesta de error al cliente
    res.status(statusCode).json({
      message: err.message || 'Ocurrió un error en el servidor',
    });
  };
  