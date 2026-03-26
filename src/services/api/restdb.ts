import Type from 'typebox';
import Compile from 'typebox/compile';
import Value from 'typebox/value';

//https://mapstorage-7e78.restdb.io/rest/mapitem
// x-apikey: 66294ad01b8daa76982dfc73
// accept: application/json

// CREATE | DELETE | UPDATE | READ

export type Fetcher = typeof fetch;

let _fetcher: Fetcher;
let _baseURL: string;
let _apiKey: string;


export const init = (fetcher: Fetcher, baseURL: string, apiKey: string) => {
    _fetcher = fetcher;
    _baseURL = baseURL;
    _apiKey = apiKey;
};

const MapItemsResponse = Type.Object({
    data: Type.Array(Type.Object({
        _id: Type.String(),
        lat: Type.Union([Type.String(), Type.Number()]),
        lng: Type.Union([Type.String(), Type.Number()]),
        title: Type.String(),
        isDone: Type.Optional(Type.Boolean({default: false})),
    })),
    totals: Type.Object({
        count: Type.Number(),
        max: Type.Number(),
        skip: Type.Number(),
        total: Type.Number(),
    })
});

export type MapItemsResponseType = Type.Static<typeof MapItemsResponse>

export const getMapItems = async (page: number = 1, perPage: number = 10): Promise<MapItemsResponseType> => {
    const url = `${_baseURL}/rest/mapitem`;
    const headers = new Headers();
    const skip = (page - 1) * perPage;
    headers.set('Accept', 'application/json');
    headers.set('x-apikey', _apiKey);

    const params = new URLSearchParams();
    params.set('totals', 'true');
    params.set('skip', skip.toString());
    params.set('max', perPage.toString());
    const res = await _fetcher(`${url}?${params.toString()}`, {
        method: 'GET',
        headers: headers,
    });

    if (!res.ok) {
        throw new Error(`Something is wrong: ${res.statusText}`);
    }

    const validator = Compile(MapItemsResponse);
    const data = await res.json();
    const errors = Value.Errors(MapItemsResponse, data);
    if (errors.length > 0) {
        throw new Error(`Error getting map items: ${JSON.stringify(errors)}`);
    }

    return validator.Parse(data);
};

// export const getDetails = async (id: string): Promise<unknown> {
//     // https://mapstorage-7e78.restdb.io/rest/mapitem/${id}
// }
