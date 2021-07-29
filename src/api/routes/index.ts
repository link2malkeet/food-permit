/* istanbul ignore file */
import Router from 'koa-router-middleware';
import { healthCheckMiddleware } from '../middleware/';
import { APIContext, APIState } from '../middleware/types';
import foodPermitRoutes from './foodPermit';

const router = new Router<APIState, APIContext>()
  .use('/healthcheck', healthCheckMiddleware)
  .use('/food-permits', foodPermitRoutes)

export default router.middleware();
