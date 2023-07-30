import { NextApiRequest, NextApiResponse } from 'next'

import { getPage } from '@/lib/action'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const rootPageId: string = req.query['id'] as string
    const page = await getPage(rootPageId)
    res.status(200).json(page)
}