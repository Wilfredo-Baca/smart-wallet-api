import { handleOAuthCallback } from "../services/user.svc.js";

export async function authMiddleware(req, res, next) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      throw {
        status: 401,
        message: "No se pudo validar la sesión porque no se envió el token",
        msg: "Usuario no autorizado",
        eType: "Unauthorized",
      };
    }

    const [scheme, token] = authorization.split(" ");

    if (scheme.toLowerCase() !== "bearer") {
      throw {
        status: 401,
        message: "No se pudo validar la sesión porque el token no es válido",
        msg: "Usuario no autorizado",
        eType: "Unauthorized",
      };
    }
    const data = await handleOAuthCallback({ local: true, token });
    req.user = data.user;
    next();
  } catch (error) {
    if (error.message === "El token no es válido") {
      return res.status(401).json({
        error: "Token expirado",
        error_description:
          "El token ha expirado, por favor inicia sesión nuevamente",
      });
    }
    res
      .status(error.status || 500)
      .json({ error: error.message, msg: error.msg, eType: error.eType });
  }
}
