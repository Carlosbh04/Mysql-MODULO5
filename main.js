
            //    Reto #1 

// const mysql = require('mysql2/promise');

// async function executeQueries() {
//   // Configurar la conexión a la base de datos
//   const connection = await mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'X29513321x@',
//     database: 'esquema',
//   });

//   try {
//     // Calcular la nota media de los alumnos de la asignatura 1
//     const query1 = 'SELECT AVG(mark) AS average_mark FROM marks WHERE subject_id = 1';
//     const [result1] = await connection.execute(query1);
//     console.log('Nota media de los alumnos de la asignatura 1:', result1[0].average_mark);

//     // Calcular el número total de alumnos que hay en el bootcamp
//     const query2 = 'SELECT COUNT(*) AS total_students FROM students';
//     const [result2] = await connection.execute(query2);
//     console.log('Número total de alumnos en el bootcamp:', result2[0].total_students);

//     // Listar todos los campos de la tabla "grupo"
//     const query3 = 'SELECT * FROM grupo';
//     const [result3] = await connection.execute(query3);
//     console.log('Datos de la tabla "grupo":', result3);

//     // Eliminar todas las notas de la base de datos que estén por encima de 5 y que sean del año pasado
//     const query4 = 'DELETE FROM marks WHERE mark > 5 AND YEAR(date) = YEAR(CURRENT_DATE) - 1';
//     const [result4] = await connection.execute(query4);
//     console.log('Número de notas eliminadas:', result4.affectedRows);

//     // Obtener los datos de todos los estudiantes que estén en el bootcamp este año
//     async function getStudentsThisYear() {
//       const query = 'SELECT * FROM students WHERE `año de ingreso` = YEAR(CURRENT_DATE)';
//       const [results] = await connection.execute(query);
//       console.log('Datos de los estudiantes en el bootcamp este año:', results);
//     }

//     await getStudentsThisYear();

//     // Calcular el número de profesores que hay por cada asignatura
//     const query6 = `
//       SELECT s.subject_id, s.title, COUNT(st.teacher_id) AS total_teachers
//       FROM subjects_teacher st
//       INNER JOIN subjects s ON st.subject_id = s.subject_id
//       GROUP BY st.subject_id, s.title
//     `;
//     const [result6] = await connection.execute(query6);
//     console.log('Número de profesores por asignatura:', result6);
//   } catch (error) {
//     console.error('Error en la ejecución de las consultas:', error);
//   } finally {
//     // Cerrar la conexión a la base de datos
//     connection.end();
//   }
// }

// executeQueries();





                       //    Reto #2
                       
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
                           // Obtén el id y la nota de los alumnos que cumplan las condiciones
                           const query1 = `
                             SELECT student_id, mark
                             FROM marks
                             WHERE (student_id BETWEEN 1 AND 20) OR (mark > 8 AND YEAR(date) = YEAR(CURRENT_DATE) - 1)
                           `;
                           const [result1] = await connection.execute(query1);
                           console.log('Alumnos que cumplen las condiciones:', result1);
                       
                           // Obtén la media de las notas por asignatura en el último año
                           const query2 = `
                             SELECT subject_id, AVG(mark) AS average_mark
                             FROM marks
                             WHERE YEAR(date) = YEAR(CURRENT_DATE) - 1
                             GROUP BY subject_id
                           `;
                           const [result2] = await connection.execute(query2);
                           console.log('Media de notas por asignatura en el último año:', result2);
                       
                           // Obtén la media aritmética de las notas por alumno en el último año
                           const query3 = `
                             SELECT student_id, AVG(mark) AS average_mark
                             FROM marks
                             WHERE YEAR(date) = YEAR(CURRENT_DATE) - 1
                             GROUP BY student_id
                           `;
                           const [result3] = await connection.execute(query3);
                           console.log('Media aritmética de notas por alumno en el último año:', result3);
                         } catch (error) {
                           console.error('Error en la ejecución de las consultas:', error);
                         } finally {
                           // Cerrar la conexión a la base de datos
                           connection.end();
                         }
                       }
                       
                       executeQueries();
                       