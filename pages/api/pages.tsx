import { NextApiRequest, NextApiResponse } from 'next'

import { getAllPages, getPage } from '@/lib/action'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const pages = await getAllPages()
    res.status(200).json(pages)
}