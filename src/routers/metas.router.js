import { Router } from 'express';
const routerMetas = Router();
import { getMetasByClientID, createMeta, getMetaById, ingresoToMeta } from '../controllers/metas.ctrl.js';
import { authMiddleware } from '../middlewares/auth.mw.js';

routerMetas.get('/', authMiddleware, getMetasByClientID);
routerMetas.get('/:IDMeta', authMiddleware, getMetaById);
routerMetas.post('/meta', authMiddleware, createMeta);
routerMetas.put('/ingreso', authMiddleware, ingresoToMeta);

export default routerMetas;