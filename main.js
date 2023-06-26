const mysql = require('mysql2/promise');

async function executeQueries() {
  // Configurar la conexión a la base de datos
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'X29513321x@',
    database: 'esquema',
  });

  try {
    // Reto 1: Obtén los nombres y apellidos de los alumnos y los nombres de las asignaturas en las que están apuntados
    const query1 = `
      SELECT s.first_name, s.last_name, sub.title
      FROM students s
      JOIN grupo g ON s.grupo_id = g.grupo_id
      JOIN subjects_teacher st ON st.grupo_id = g.grupo_id
      JOIN subjects sub ON st.subject_id = sub.subject_id
    `;
    const [result1] = await connection.execute(query1);
    console.log('Nombres y apellidos de los alumnos y nombres de las asignaturas:');
    console.log(result1);

    // Reto 2: Obtén todos los nombres y apellidos de los profesores y los nombres de las asignaturas que imparten
    const query2 = `
      SELECT t.first_name, t.last_name, sub.title
      FROM teachers t
      JOIN subjects_teacher st ON t.teacher_id = st.teacher_id
      JOIN subjects sub ON st.subject_id = sub.subject_id
    `;
    const [result2] = await connection.execute(query2);
    console.log('Nombres y apellidos de los profesores y nombres de las asignaturas que imparten:');
    console.log(result2);

    // Reto 3: Obtén el número total de alumnos por asignatura, el nombre de la asignatura y el nombre y apellidos del profesor que la imparte
    const query3 = `
      SELECT COUNT(s.student_id) AS total_alumnos, sub.title, t.first_name, t.last_name
      FROM students s
      JOIN grupo g ON s.grupo_id = g.grupo_id
      JOIN subjects_teacher st ON st.grupo_id = g.grupo_id
      JOIN subjects sub ON st.subject_id = sub.subject_id
      JOIN teachers t ON st.teacher_id = t.teacher_id
      GROUP BY sub.title, t.first_name, t.last_name
    `;
    const [result3] = await connection.execute(query3);
    console.log('Número total de alumnos por asignatura, nombre de la asignatura y nombre y apellidos del profesor que la imparte:');
    console.log(result3);
  } catch (error) {
    console.error('Error en la ejecución de las consultas:', error);
  } finally {
    // Cerrar la conexión a la base de datos
    connection.end();
  }
}

executeQueries();
