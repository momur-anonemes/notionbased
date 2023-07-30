import { ExtendedRecordMap } from 'notion-types'
import { SiteConfig } from './site.config'

export interface PageMeta {
    pageId: string
    slug: string
    title: string
    description: string
    author: string
    public: boolean
    tags: string[]
}

export interface PageProps {
    siteConfig: SiteConfig
    recordMap: ExtendedRecordMap
}