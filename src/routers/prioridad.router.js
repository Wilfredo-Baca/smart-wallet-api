import { Router } from 'express';
const routerPrioridad = Router();
import { getPrioridades } from '../controllers/priorioridad.ctrl.js';

routerPrioridad.get('/', getPrioridades);

export default routerPrioridad;