import { decode } from "jsonwebtoken";
import { createJwtToken } from "../utils/security.js";
import axios from "axios";
import { SECRET_KEY } from "../config.js";

export async function validateO365Token(token) {
  try {
    const response = await axios.get("https://graph.microsoft.com/v1.0/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const localToken = createJwtToken(response.data);
    return { localToken, user: decodedTokenLocal(localToken) };
  } catch (error) {
    throw new Error("Invalid token");
  }
}

export const decodedTokenLocal = (token) => {
  return decode(token, SECRET_KEY);
};
