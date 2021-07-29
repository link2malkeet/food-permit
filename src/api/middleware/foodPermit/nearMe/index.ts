import { isPointWithinRadius } from 'geolib';
import { APIContext, APIState } from '../../types';
import { Middleware, ParameterizedContext } from 'koa';
import * as HttpStatus from 'http-status-codes';
export const getNearMe: Middleware<APIState, APIContext> = async (ctx: ParameterizedContext<APIState, APIContext>, next: () => Promise<any>) => {
    const centerPoint = ctx.query.centerPoint;
    const radius = ctx.query.radius || 5;
    if (!centerPoint) {
        ctx.throw(HttpStatus.BAD_REQUEST, "centerPoint(your location) - must be provided with comma-separated values. For example: centerPoint=37.78844615690132,-122.3986412420388.");
    }
    const loc = (centerPoint as string).split(',')
    const locLatitude = loc[0];
    const locLongitude = loc[1];
    if (!locLatitude || !locLongitude) {
        ctx.throw(HttpStatus.BAD_REQUEST, "centerPoint(your location) - comma-separated value can not be empty.");
    }
    const nearMeLocations = [];
    for (const each of ctx.state.table2) {
        const latitude = each['Latitude']
        const longitude = each['Longitude']
        if (isPointWithinRadius({ latitude, longitude }, { latitude: locLatitude, longitude: locLongitude }, radius as number)) {
            nearMeLocations.push(each)
        }
    }
    ctx.status = 200;
    ctx.body = nearMeLocations
    await next();
}