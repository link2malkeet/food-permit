import * as HttpStatus from 'http-status-codes';
import { APIContext, APIState } from '../../types';
import { Middleware, ParameterizedContext } from 'koa';
export const searchByAddress: Middleware<APIState, APIContext> = (ctx: ParameterizedContext<APIState, APIContext>, next: () => Promise<any>) => {
    const { searchKey } = ctx.query;
    if (!searchKey) {
        ctx.throw(HttpStatus.BAD_REQUEST, "'searchKey' is not provided in the query parameter.");
    }
    ctx.body = ctx.state.table1.filter((d: any) => d.toLowerCase().includes(searchKey as string));
    ctx.status = 200;
    return next();
}
