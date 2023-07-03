// Importa el módulo de base de datos
const db = require('../database');

// Obtener un alumno por ID
const getAlumnoById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const query = 'SELECT student_id, first_name, last_name, grupo_id, YEAR(año_de_ingreso) AS año_de_ingreso FROM students WHERE student_id = ?';

    const [alumnos, fields] = await db.query(query, [id]);

    if (alumnos.length === 0) {
      res.status(404).json({ message: 'Alumno no encontrado' });
    } else {
      res.status(200).json(alumnos[0]);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};


// Obtener todos los alumnos
const getAlumnos = async (req, res, next) => {
  try {
    const query = 'SELECT * FROM students';

    const [alumnos] = await db.query(query); // Solo asignamos el primer elemento

    res.status(200).json(alumnos);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

// Añadir un nuevo alumno
const addAlumno = async (req, res, next) => {
  try {
    const { student_id, first_name, last_name, grupo_id, año_de_ingreso } = req.body;

    // Verificar si el grupo_id existe en la tabla grupo
    const grupoQuery = 'SELECT COUNT(*) AS count FROM grupo WHERE grupo_id = ?';
    const [grupoResult] = await db.query(grupoQuery, [grupo_id]);

    if (grupoResult[0].count === 0) {
      // El grupo_id no existe en la tabla grupo, insertarlo
      const insertGrupoQuery = 'INSERT INTO grupo (grupo_id) VALUES (?)';
      await db.query(insertGrupoQuery, [grupo_id]);
    }

    // Insertar el alumno en la tabla students
    const query = 'INSERT INTO students (student_id, first_name, last_name, grupo_id, año_de_ingreso) VALUES (?, ?, ?, ?, ?)';
    const [result] = await db.query(query, [student_id, first_name, last_name, grupo_id, año_de_ingreso]);

    const alumnoId = result.insertId;
    res.status(201).json({ message: 'Alumno añadido correctamente', id: alumnoId });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

// Modificar los datos de un alumno
const updateAlumno = async (req, res, next) => {
  try {
    const { student_id, first_name, last_name, grupo_id, año_de_ingreso } = req.body;

    const query = `
      UPDATE students 
      SET first_name = ?, last_name = ?, grupo_id = ?, año_de_ingreso = ? 
      WHERE student_id = ?
    `;

    const [result] = await db.query(query, [first_name, last_name, grupo_id, año_de_ingreso, student_id]);

    if (result.changedRows === 0) {
      res.status(200).json({ message: 'No se realizaron modificaciones' });
    } else {
      res.status(200).json({ mensaje: 'Alumno actualizado correctamente' });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

// Eliminar a un alumno
const deleteAlumno = async (req, res, next) => {
  try {
    const { id } = req.body;
    const query = 'DELETE FROM students WHERE student_id = ?';

    const [result] = await db.query(query, [id]);

    if (result.affectedRows === 0) {
      res.status(404).json({ mensaje: 'Alumno no encontrado' });
    } else {
      res.status(200).json({ mensaje: 'Alumno eliminado correctamente' });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};


const errorHandler = (err, req, res, next) => {
  console.error(err);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    message: err.message || 'Ocurrió un error en el servidor',
  });
};

// Exporta las funciones
module.exports = { getAlumnoById,getAlumnos, addAlumno,updateAlumno,deleteAlumno,errorHandler,
};
