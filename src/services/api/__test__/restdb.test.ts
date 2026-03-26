import {jest, describe, it, expect, beforeEach} from '@jest/globals';
import {init, getMapItems} from '../restdb';
import {Fetcher} from '../restdb';

describe('RestBD API', () => {
    describe('getMapItems', () => {
        // mock
        const mockedFetcher = jest.fn(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
                data: [
                    {
                        _id: 'id',
                        lat: 1,
                        lng: 2,
                        title: 'Test item',
                        isDone: false,
                    }
                ],
                totals: {
                    count: 0,
                    max: 0,
                    skip: 0,
                    total: 0,
                }
            }),
        })) as unknown as Fetcher;

        beforeEach(() => {
            // initialization
            init(mockedFetcher, '/', 'key');
        });

        it('returns an array of MapItemsResponse', async () => {
            // action
            const result = await getMapItems();

            // assertion
            expect(result.data).toEqual([
                {
                    _id: 'id',
                    lat: 1,
                    lng: 2,
                    title: 'Test item',
                    isDone: false,
                }
            ]);
        });

    });
});
