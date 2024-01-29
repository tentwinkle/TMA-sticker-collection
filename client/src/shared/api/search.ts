import { createEffect } from 'effector';

import { DEFAULT_LIMIT } from '../constants';

import request from './request';

import { IStickerSet } from '@/types';


type fetchStickerSetsType = {
  query: string | string[],
  limit?: number,
  skip: number,
  type: string,
  user_token: string | null,
  kind: string,
};

export const fetchStickersSetsFx = createEffect(async ({
  query = '',
  limit = DEFAULT_LIMIT,
  skip = 0,
  type = '',
  user_token,
  kind,
}: fetchStickerSetsType) => {
  // return (new Promise(() => {}) as any);
  const { data } = await request.post<{ stickerSets: IStickerSet[] }, fetchStickerSetsType>('searchStickerSet', {
    query,
    limit,
    skip,
    type,
    user_token,
    kind,
  });

  let now = Date.now();

  for (const set of data.result.stickerSets) {
    set.index = ++now;
  }

  return data.result.stickerSets;
});
