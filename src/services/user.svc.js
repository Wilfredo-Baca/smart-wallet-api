import getConnection from "../database/connection.db.js";
import sql from "mssql";
import { users } from "../database/querys.db.js";
import { validateO365Token, decodedTokenLocal } from "../utils/jwt.utils.js";

export async function findUserByOid(oid) {
  try {
    const pool = await getConnection();
    const request = pool.request();
    request.input("oid", sql.VarChar, oid);
    const result = await request.query(users.findUserByOid);
    if (result.recordset.length === 0) {
      return "NO USER";
    }
    if (result.recordset[0].MESSAGE == "Usuario no encontrado") {
      return "NO USER";
    }
    return result.recordset[0];
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function createUser(userData) {
  const { oid, email, names, id_provider, Telefono, Dirección } = userData;
  try {
    const pool = await getConnection();
    const request = pool.request();
    request.input("ID_Usuario_Proveedor", sql.VarChar, oid);
    request.input("Correo", sql.VarChar, email);
    request.input("Nombre", sql.VarChar, names);
    request.input("ID_Proveedor", sql.UniqueIdentifier, id_provider);
    request.input("Identificacion", sql.VarChar, null);
    request.input("Telefono", sql.VarChar, Telefono);
    request.input("Direccion", sql.VarChar, Dirección);
    request.input("Fecha_Nacimiento", sql.Date, null);

    const result = await request.query(users.createUser);
    return result.recordset[0];
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function handleOAuthCallback({ local, token }) {
  try {
    let decodedToken = null;
    let tokenLocal = null;
    if (!local) {
      const response = await validateO365Token(token);
      decodedToken = response.user;
      tokenLocal = response.localToken;
    } else decodedToken = decodedTokenLocal(token);
    let user = await findUserByOid(decodedToken.id);
    if (user === "NO USER") {
      user = await createUser({
        names: decodedToken.displayName,
        oid: decodedToken.id,
        email: decodedToken.mail,
        id_provider: "471bcc4e-66e5-4477-ac17-d62caa4a06d9",
        Telefono: null,
        Dirección: null,
      });
    }
    
    return { user, tokenLocal };
  } catch (error) {
    throw new Error("El token no es válido");
  }
}
