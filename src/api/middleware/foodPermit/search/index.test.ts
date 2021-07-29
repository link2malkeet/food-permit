
import { ParameterizedContext } from 'koa';
import { createTestContext, getTestState } from '../../../__mocks__';
import { APIContext, APIState } from '../../../middleware/types';
import { searchByAddress } from './index';

const state = getTestState();
const searchKey = 'bay';
let context: ParameterizedContext<APIState, APIContext>;
const next = jest.fn();
describe('test searchByAddress', () => {
    it('should get results', async () => {
        context = createTestContext('GET', '/searchByAddress?searchKey=x', state, {}, {}, {}, { searchKey });
        await searchByAddress(context, next);
        expect(context.body).toEqual([
            "531 BAY SHORE BLVD",
            "491 BAY SHORE BLVD",
            "201 BAY SHORE BLVD",
            "353 BAY SHORE BLVD",
            "491 BAY SHORE BLVD",
            "2555 BAY SHORE BLVD",
        ]);
        expect(next).toBeCalled();
    });
    it('should return error', async () => {
        context = createTestContext('GET', '/searchByAddress', state, {}, {}, {}, {});
        try {
            await searchByAddress(context, next);
        } catch (e) {
            expect(e.message).toEqual(`'searchKey' is not provided in the query parameter.`)
        }
    });
})