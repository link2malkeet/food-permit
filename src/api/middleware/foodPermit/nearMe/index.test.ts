import { isPointWithinRadius } from 'geolib';
import { ParameterizedContext } from 'koa';
import { createTestContext, getTestState } from '../../../__mocks__';
import { APIContext, APIState } from '../../../middleware/types';
import { getNearMe } from './index';
jest.mock("geolib", () => {
    return {
        isPointWithinRadius: () => {
            return true;
        }
    }
});
const state = getTestState();
const centerPoint = '37.78844615690132,-122.3986412420388';
let context: ParameterizedContext<APIState, APIContext>;
const next = jest.fn();
describe('test nearMe', () => {
    it('should get the near me locations', async () => {
        context = createTestContext('GET', '/near-me?centerPoint=x', state, {}, {}, {}, { centerPoint });
        await getNearMe(context, next);
        expect(context.body).toEqual([
            {
                "Address": "555 MISSION ST",
                "Latitude": "37.78844615690132",
                "LocationDescription": "MISSION ST: SHAW ALY to ANTHONY ST (543 - 586)",
                "Longitude": "-122.3986412420388",
                "locationid": "1524388",
            },
            {
                "Address": "560 MISSION ST",
                "Latitude": "37.78886471534304",
                "LocationDescription": "MISSION ST: SHAW ALY to ANTHONY ST (543 - 586)",
                "Longitude": "-122.39935935136297",
                "locationid": "1524389",
            },
        ]);
        expect(next).toBeCalled();
    });
    [
        {
            context: createTestContext('GET', '/near-me', state, {}, {}, {}, {}),
            expected: 'centerPoint(your location) - must be provided with comma-separated values. For example: centerPoint=37.78844615690132,-122.3986412420388.'
        },
        {
            context: createTestContext('GET', '/near-me?center', state, {}, {}, {}, {}),
            expected: 'centerPoint(your location) - must be provided with comma-separated values. For example: centerPoint=37.78844615690132,-122.3986412420388.'
        },
        {
            context: createTestContext('GET', '/near-me', state, {}, {}, {}, {centerPoint: '123,'}),
            expected: 'centerPoint(your location) - comma-separated value can not be empty.'
        }
    ].forEach(({ context, expected }) => {
        it('should return error', async () => {
            try {
                await getNearMe(context, next);
            } catch (e) {
                expect(e.message).toEqual(expected)
            }
        });
    })
})