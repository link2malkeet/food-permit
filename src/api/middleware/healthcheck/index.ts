/* istanbul ignore file */
import { APIContext, APIState } from '../types';

import Router from 'koa-router-middleware';

export default new Router<APIState, APIContext>().get('/', (ctx) => (ctx.body = 'Ok')).middleware();
