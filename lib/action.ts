import { parsePageId, getAllPagesInSpace, uuidToId } from 'notion-utils'
import { ExtendedRecordMap, PageMap } from 'notion-types';
import pMemoize from 'p-memoize'

import { siteConfig } from './site.config';
import { notion } from '@/lib/notion'
import { PageMeta } from '@/lib/types'

export async function getPage(pageId: string): Promise<ExtendedRecordMap> {
    const rootPageId = parsePageId(pageId)
    return await notion.getPage(rootPageId)
}

export async function getAllPages(): Promise<PageMap> {
    const rootPageId = parsePageId(siteConfig.rootPageId)
    const getPage = async (pageId: string, ...args: any[]) => {
        return notion.getPage(pageId, ...args)
    }

    return await getAllPagesInSpace(rootPageId, undefined, getPage)
}

export async function getDatabase(): Promise<PageMeta[]> {
    const index: PageMeta[] = []
    const rootPage = await getPage(siteConfig.rootPageId)
    const collection = Object.values(rootPage.collection)[0]
    const schema = collection.value.schema
    const pages = await getAllPages()
    Object.entries(pages).forEach(([key, value]) => {
        if (uuidToId(key) == uuidToId(siteConfig.rootPageId)) {
            return
        }
        const meta: PageMeta = {
            pageId: uuidToId(key),
            slug: '',
            title: '',
            description: '',
            author: '',
            public: false,
            tags: []
        }
        Object.entries(value?.block[key].value.properties).forEach(([key, value]) => {
            if (key == 'title') {
                meta.title = (value as [string])[0][0]
            } else if (!schema[key]) {
            } else if (schema[key].name == 'Slug') {
                meta.slug = (value as [string])[0][0]
            } else if (schema[key].name == 'Description') {
                meta.description = (value as [string])[0][0]
            } else if (schema[key].name == 'Author') {
                meta.author = (value as [string])[0][0]
            } else if (schema[key].name == 'Public') {
                meta.public = (value as [string])[0][0] == 'Yes'
            } else if (schema[key].name == 'Tags') {
                meta.tags = (value as [string])[0][0].split(',')
            }
        })
        index.push(meta)
    })
    return index
}

export const getPageWithCache = pMemoize(getPage)
export const getAllPagesWithCache = pMemoize(getAllPages)
export const getDatabaseWithCache = pMemoize(getDatabase)