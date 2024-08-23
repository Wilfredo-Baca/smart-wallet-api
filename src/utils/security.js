import jwt from "jsonwebtoken";
import crypto from "crypto";
import { SECRET_KEY } from "../config.js";

// Función para generar code_challenge (PKCE)
export const generatePkceChallenge = (verifier) => {
  return crypto.createHash("sha256").update(verifier).digest("base64url");
};

export const createJwtToken = ({ displayName, mail, id }) => {
  const expiration = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30;
  const token = jwt.sign(
    {
      displayName,
      mail,
      id,
      exp: expiration,
      iat: Math.floor(Date.now() / 1000),
    },
    SECRET_KEY,
    { algorithm: "HS256" }
  );
  return token;
};
