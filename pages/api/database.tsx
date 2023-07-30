import { NextApiRequest, NextApiResponse } from 'next'

import { getDatabase } from '@/lib/action'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const index = await getDatabase()
    res.status(200).json(index)
}