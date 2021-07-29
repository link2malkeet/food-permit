import { ParameterizedContext } from 'koa';
import { createTestContext, getTestState } from '../../__mocks__';
import { APIContext, APIState } from '../types';
import { readData } from '.';
let context: ParameterizedContext<APIState, APIContext>;
const next = jest.fn();
const state = getTestState();
describe('test readData', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('readData', () => {
    beforeEach(() => {
      context = createTestContext(
        'GET',
        `/food-permits/near-me`,
        state
      );
    });
    it('should create local db structure', async () => {
      await readData(context as any, next);
      expect(context.state.table1.length).toBe(context.state.table2.length);
      expect(next).toBeCalled();
    });
  });
});
