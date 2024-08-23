import getConnection from "../database/connection.db.js";
import sql from "mssql";
import { accounts } from "../database/querys.db.js";

const getAccountByUser = async (req, res) => {
  try {
    const { IDUsuario } = req.user;
    const pool = await getConnection();
    const request = pool.request();
    request.input("IDUsuario", sql.UniqueIdentifier, IDUsuario);
    const result = await request.query(accounts.getAccountByUser);
    if (result.recordsets.length === 0) {
      pool.close();
      return res.status(404).send("No se encontraron cuentas para el usuario");
    }
    pool.close();
    if (result.recordset.length === 0) {
      return res.json(["No hay cuentas registradas"]);
    }
    return res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export { getAccountByUser };