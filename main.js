const mysql = require('mysql2/promise');

async function executeActions() {
  // Configurar la conexión a la base de datos
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'X29513321x@',
    database: 'esquema',
  });

  async function runQuery(query) {
    try {
      const [rows] = await connection.execute(query);
      return rows;
    } catch (error) {
      throw new Error(`Error executing query: ${error.message}`);
    }
  }

  async function modifyDireccionTable() {
    try {
      await runQuery('ALTER TABLE `esquema`.`dirrecion` ADD COLUMN Ciudad VARCHAR(45) NULL AFTER Calle' );
      await runQuery('ALTER TABLE `esquema`.`dirrecion` DROP COLUMN');
      console.log('La tabla dirección ha sido modificada correctamente.');
      console.log('----------------------------------------------');
    } catch (error) {
      console.error('Error al modificar la tabla dirección:', error);
    }
  }

  async function deleteDireccionTable() {
    try {
      await runQuery('DROP TABLE dirección');
      console.log('La tabla dirección ha sido eliminada correctamente.');
    } catch (error) {
      console.error('Error al eliminar la tabla dirección:', error);
    }
  }

  async function setAllMarksToZero() {
    try {
      await runQuery('UPDATE students SET mark = 0');
      console.log('Todas las notas de los alumnos han sido actualizadas a 0.');
    } catch (error) {
      console.error('Error al actualizar las notas:', error);
    }
  }

  async function getStudentsNameAndLastName() {
    try {
      const rows = await runQuery('SELECT first_name, last_name FROM students');
      console.log('Nombre y apellido de los estudiantes:');
      rows.forEach((row) => {
        console.log(`${row.first_name} ${row.last_name}`);
      });
    } catch (error) {
      console.error('Error al obtener los nombres y apellidos de los estudiantes:', error);
    }
  }

  async function getAllTeachersData() {
    try {
      const rows = await runQuery('SELECT * FROM teachers');
      console.log('Datos de los profesores:');
      rows.forEach((row) => {
        console.log(row);
      });
    } catch (error) {
      console.error('Error al obtener los datos de los profesores:', error);
    }
  }

  try {
    // await modifyDireccionTable();
    // await deleteDireccionTable();
    // await setAllMarksToZero();
    // await getStudentsNameAndLastName();
    // await getAllTeachersData();
    // await deleteOldNotes(connection);
    await updateStudentsMarks(connection);
  } catch (error) {
    console.error('Error en la ejecución de las acciones:', error);
  } finally {
    // Cerrar la conexión a la base de datos
    connection.end();
  }
}

async function deleteOldNotes(connection) {
  try {
    const tenYearsAgo = new Date();
    tenYearsAgo.setFullYear(tenYearsAgo.getFullYear() - 10);
    const sql = `DELETE FROM marks WHERE date < ?`;
    const [result] = await connection.execute(sql, [tenYearsAgo]);
    console.log(`Se han eliminado ${result.affectedRows} notas antiguas.`);
  } catch (error) {
    console.error('Error al eliminar las notas antiguas:', error);
  }
}
async function updateStudentsMarks(connection) {
    try {
      const sql = `UPDATE marks SET mark = 5 WHERE mark < 21`;
      const [result] = await connection.execute(sql);
      console.log(`Se han actualizado ${result.affectedRows} registros.`);
    } catch (error) {
      console.error('Error al actualizar las notas:', error);
    }
  }
  

executeActions();



  
 
  