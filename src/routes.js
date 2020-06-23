import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import CallController from './app/controllers/CallController';
import PlanController from './app/controllers/PlanController';
import CostController from './app/controllers/CostController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/calculate', CallController.calculate);
routes.post('/login', SessionController.login);
routes.get('/plans', PlanController.index);

// Apartir daqui somente rotas com autenticação
routes.use(authMiddleware);

// Users routes
routes.put('/users', UserController.update);
routes.post('/users', UserController.store);

// Plan routes
routes.post('/plans', PlanController.store);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

// Cost routes
routes.get('/costs', CostController.index);
routes.post('/costs', CostController.store);
routes.put('/costs/:id', CostController.update);
routes.delete('/costs/:id', CostController.delete);

export default routes;
