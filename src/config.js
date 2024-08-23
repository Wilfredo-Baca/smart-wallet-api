import { config } from "dotenv";
config();

export const configConnection = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: true,
    enableArithAbort: true,
  },
};

export const {
  PORT = 3003,
  CLIENT_ID,
  CLIENT_SECRET,
  TENANT_ID,
  REDIRECT_URI,
  PKCE,
  SECRET_KEY,
  SECRET_KEY_FUNC
} = process.env;
