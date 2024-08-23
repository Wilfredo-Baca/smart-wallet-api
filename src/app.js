import express from "express";
import cors from "cors";
import notFound from "./routers/404.js";

// importación de los middlewares
import errorHandler from "./middlewares/errors.mw.js";

// importación de los routers
import routerMetas from "./routers/metas.router.js";
import routerO365 from "./routers/authO365.router.js";
import routerPrioridad from "./routers/prioridad.router.js";
import routerAccounts from "./routers/accounts.router.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/auth", routerO365);
app.get('/logout', (req, res) => {
  const logoutUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/logout?post_logout_redirect_uri=https://smart-wallet-70l.pages.dev/signin`;
  res.redirect(logoutUrl);
});
app.use("/cuentas", routerAccounts);
app.use("/prioridades", routerPrioridad);
app.use("/metas", routerMetas);
app.use("/", notFound);
app.use(errorHandler);

export default app;
