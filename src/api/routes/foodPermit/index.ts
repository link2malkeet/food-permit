/* istanbul ignore file */
import Router from 'koa-router-middleware';
import { foodPermitMiddleware } from '../../middleware';
import { APIContext, APIState } from '../../middleware/types';
import { readData } from '../../middleware/data/index';

export default new Router<APIState, APIContext>()
    .use(readData)
    .get(
        '/search-by-address',
        foodPermitMiddleware.searchByAddress,
    )
    .get(
        '/near-me',
        foodPermitMiddleware.getNearMe
    )
    .middleware();
