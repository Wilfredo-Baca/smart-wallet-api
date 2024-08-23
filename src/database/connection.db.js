import sql from 'mssql';
const { pool } = sql;
import { configConnection } from '../config.js';
async function getConnection() {
  try {
    const pool = await sql.connect(configConnection);
    console.log(`Coneccion exitosa a la base de datos ${configConnection.database}`);
    return pool;
  } catch (error) {
    pool.close();
    console.log(error);
  }
}

export default getConnection;