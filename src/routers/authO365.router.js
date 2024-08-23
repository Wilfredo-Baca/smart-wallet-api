import { Router } from 'express';
const routerO365 = Router();
import { loginO365, authCallbackO365 } from '../controllers/authO365.ctrl.js';

routerO365.get('/login', loginO365);
routerO365.get('/callback', authCallbackO365);

export default routerO365;