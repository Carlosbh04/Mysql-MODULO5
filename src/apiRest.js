const app = require('./app');
const db = require('./database');

const PORT = 3000;

// Verificar la conexión a la base de datos antes de iniciar el servidor
db.getConnection()
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
    app.listen(PORT, () => {
      console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error al conectar con la base de datos:', err);
  });
