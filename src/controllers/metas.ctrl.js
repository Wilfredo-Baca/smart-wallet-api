import getConnection from "../database/connection.db.js";
import sql from "mssql";
import { metas } from "../database/querys.db.js";

const getMetasByClientID = async (req, res) => {
  try {
    const { IDUsuario } = req.user;
    const pool = await getConnection();
    const request = pool.request();
    request.input("IDUsuario", sql.VarChar, IDUsuario);
    const result = await request.query(metas.getMetasByClientID);
    if (result.recordsets.length === 0) {
      pool.close();
      return res.status(404).send("No se encontraron metas para el usuario");
    }
    pool.close();
    if (result.recordset.length === 0) {
      return res.json(["No hay metas registradas"]);
    }
    return res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const createMeta = async (req, res) => {
  try {
    const { IDUsuario } = req.user;
    const { title, amount, priority, startDate, endDate, description } =
      req.body;
    const pool = await getConnection();
    const request = pool.request();
    request.input("IDUsuario", sql.UniqueIdentifier, IDUsuario);
    request.input("Titulo", sql.VarChar, title);
    request.input("Monto", sql.Decimal, amount);
    request.input("Prioridad", sql.UniqueIdentifier, priority);
    request.input("FechaInicio", sql.Date, startDate);
    request.input("FechaFin", sql.Date, endDate);
    request.input("Descripcion", sql.VarChar, description);
    const result = await request.query(metas.createMeta);
    if (result.rowsAffected.length === 0) {
      pool.close();
      return res.status(400).send("No se pudo crear la meta");
    }
    pool.close();
    return res.json("Meta creada correctamente");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const getMetaById = async (req, res) => {
  try {
    const { IDMeta } = req.params;
    const pool = await getConnection();
    const request = pool.request();
    request.input("IDMeta", sql.UniqueIdentifier, IDMeta);
    const result = await request.query(metas.getMetaById);
    if (result.recordsets.length === 0) {
      pool.close();
      return res.status(404).send("No se encontró la meta");
    }
    pool.close();
    if (result.recordsets.length > 0) {
      return res.json(result.recordsets[1]);
    }
    if (result.recordset.length === 0) {
      return res.json(["No hay metas registradas"]);
    }
    return res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const ingresoToMeta = async (req, res) => {
  try {
    const { IDUsuario } = req.user;
    const { IDMeta, IDCuentaOrigen, Monto } = req.body;
    const pool = await getConnection();
    const request = pool.request();
    request.input("IDUsuario", sql.UniqueIdentifier, IDUsuario);
    request.input("IDMeta", sql.UniqueIdentifier, IDMeta);
    request.input("IDCuentaOrigen", sql.UniqueIdentifier, IDCuentaOrigen);
    request.input("Monto", sql.Decimal, Monto);
    const result = await request.query(metas.TransferirFondosMetaAhorro);
    if (result.rowsAffected.length === 0) {
      pool.close();
      return res.status(400).send("No se pudo transferir los fondos");
    }
    pool.close();
    console.log(result);
    return res.json("Fondos transferidos correctamente");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export { getMetasByClientID, createMeta, getMetaById, ingresoToMeta };
