const db = require('../database');

// Obtener la nota media del alumno por ID
const getMediaById = async (req, res, next) => {
    try {
      const id = req.params.id;
      const query = 'SELECT AVG(mark) AS media FROM marks WHERE student_id = ?';
  
      const [result, fields] = await db.query(query, [id]);
  
      const media = parseFloat(result[0].media);
      const roundedMedia = media.toFixed(2);
  
      res.status(200).json({ media: roundedMedia });
    } catch (err) {
      console.error(err);
      next(err);
    }
  };
  
  
// Obtener las asignaturas apuntadas por el alumno por ID
const getAsignaturasById = async (req, res, next) => {
    try {
      const id = req.query.id || req.params.id; // Obtener el ID del estudiante desde el parámetro de la URL o desde la consulta
  
      const query = `
        SELECT students.first_name, students.last_name, subjects.title AS nombre
        FROM students
        INNER JOIN subjects_teacher ON students.grupo_id = subjects_teacher.grupo_id
        INNER JOIN subjects ON subjects_teacher.subject_id = subjects.subject_id
        WHERE students.student_id = ?
      `;
  
      const [result, fields] = await db.query(query, [id]);
  
      const alumno = {
        first_name: result[0].first_name,
        last_name: result[0].last_name
      };
  
      const asignaturas = result.map((row) => row.nombre);
  
      res.status(200).json({ alumno, asignaturas });
    } catch (err) {
      console.error(err);
      next(err);
    }
  };
  ;
  
  
// Obtener los alumnos y las asignaturas a las que están apuntados
const getAlumnosAsignaturas = async (req, res, next) => {
  try {
    const query = `
      SELECT students.first_name, students.last_name, subjects.title AS asignatura
      FROM students
      INNER JOIN marks ON students.student_id = marks.student_id
      INNER JOIN subjects ON marks.subject_id = subjects.subject_id
    `;

    const [result] = await db.query(query);

    const data = result.map((row) => ({
      nombre: row.first_name,
      apellido: row.last_name,
      asignatura: row.asignatura
    }));

    res.status(200).json({ data });
  } catch (err) {
    console.error(err);
    next(err);
  }
};



// Obtener las asignaturas impartidas por el profesor por ID
const getAsignaturasImpartidasById = async (req, res, next) => {
  try {
    const id = req.query.id || req.params.id; // Obtener el ID del profesor desde el parámetro de la URL o desde la consulta
    const query = `
      SELECT teachers.first_name, teachers.last_name, subjects.title AS asignatura
      FROM subjects
      INNER JOIN subjects_teacher ON subjects.subject_id = subjects_teacher.subject_id
      INNER JOIN teachers ON subjects_teacher.teacher_id = teachers.teacher_id
      WHERE teachers.teacher_id = ?
    `;

    const [result, fields] = await db.query(query, [id]);

    const data = result.map((row) => ({
      nombre: row.first_name,
      apellido: row.last_name,
      asignatura: row.asignatura
    }));

    res.status(200).json({ data });
  } catch (err) {
    console.error(err);
    next(err);
  }
};


// Obtener los profesores y las asignaturas que imparten
const getProfesoresAsignaturas = async (req, res, next) => {
  try {
    const query = `
      SELECT teachers.first_name, teachers.last_name, subjects.title AS asignatura
      FROM teachers
      INNER JOIN subjects_teacher ON teachers.teacher_id = subjects_teacher.teacher_id
      INNER JOIN subjects ON subjects_teacher.subject_id = subjects.subject_id
    `;

    const [result, fields] = await db.query(query);

    const data = result.map((row) => ({
      nombre: row.first_name,
      apellido: row.last_name,
      asignatura: row.asignatura
    }));

    res.status(200).json({ data });
  } catch (err) {
    console.error(err);
    next(err);
  }
};



module.exports = { getMediaById,getAsignaturasById,getAlumnosAsignaturas,getAsignaturasImpartidasById,getProfesoresAsignaturas
};
