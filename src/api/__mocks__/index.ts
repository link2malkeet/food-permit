import { ParameterizedContext } from 'koa';
import createContext from 'koa-create-context';
import { APIContext, APIState } from '../middleware/types';

export const createTestContext = (
    method: string,
    path: string,
    state?: APIState,
    body?: object,
    params?: object,
    request?: object,
    query?: object
): ParameterizedContext<APIState, APIContext> => {
    const ctx = createContext({
        state,
        request: { method, path, body, ...request },
        test: 'waassap',
        params,
        query,
        data: undefined
    });
    return ctx;
};

export const getTestState = (): APIState => {
    return {
        table1: ["1 BUSH ST",
            "225 BUSH ST",
            "531 BAY SHORE BLVD",
            "491 BAY SHORE BLVD",
            "131 SHOTWELL ST",
            "133 SHIPLEY ST",
            "201 BAY SHORE BLVD",
            "1153 SHAFTER AVE",
            "353 BAY SHORE BLVD",
            "1207 SHAFTER AVE",
            "491 BAY SHORE BLVD",
            "2555 BAY SHORE BLVD",
            "200 SHOTWELL ST",
            "1 BUSH ST"],
        table2: [
            {
              LocationDescription: 'MISSION ST: SHAW ALY to ANTHONY ST (543 - 586)',
              Address: '555 MISSION ST',
              Latitude: '37.78844615690132',
              Longitude: '-122.3986412420388',
              locationid: '1524388'
            },
            {
              LocationDescription: 'MISSION ST: SHAW ALY to ANTHONY ST (543 - 586)',
              Address: '560 MISSION ST',
              Latitude: '37.78886471534304',
              Longitude: '-122.39935935136297',
              locationid: '1524389'
            }
          ]
    };
};

