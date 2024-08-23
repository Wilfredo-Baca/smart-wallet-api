import { Router } from 'express';
const routerAccounts = Router();
import { getAccountByUser } from '../controllers/accounts.ctrl.js';
import { authMiddleware } from '../middlewares/auth.mw.js';

routerAccounts.get('/usuario', authMiddleware, getAccountByUser);

export default routerAccounts;