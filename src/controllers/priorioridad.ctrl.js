import getConnection from "../database/connection.db.js";
import { metas } from "../database/querys.db.js";

export const getPrioridades = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(metas.getPrioridades);
    if (result.rowsAffected[0] == 0) {
      pool.close();
      return res.status(404).json({ message: "No se encontraron prioridades" });
    }
    pool.close();
    return res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
