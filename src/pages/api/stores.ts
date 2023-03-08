import type { NextApiRequest, NextApiResponse } from 'next';
import { Store } from '../../../types/store';

// 매장배열을 리턴하는 임시 api
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Store[]>
) {
  const stores = (await import('../../../public/stores.json'))
    .default as Store[];

  res.status(200).json(stores);
}
