import * as React from 'react'
import { ExtendedRecordMap } from 'notion-types'

import { SiteConfig, siteConfig } from '@/lib/site.config'
import { PageProps } from '@/lib/types'
import { getDatabaseWithCache, getPage } from '@/lib/action'
import { NotionPage } from '@/components/NotionPage'

export interface IndexPageProps {
    siteConfig: SiteConfig
    recordMap: ExtendedRecordMap
}

export const getStaticProps = async () => {
    try {
        const database = await getDatabaseWithCache()
        const pageId = database.find((v) => v.slug == '/')?.pageId
        if (pageId) {
            const recordMap = await getPage(pageId)
            const props: PageProps = { siteConfig, recordMap }
            return { props, revalidate: 10 }
        }
        throw `Can't find index page`
    } catch (err) {
        console.error('page error', err)
        // we don't want to publish the error version of this page, so
        // let next.js know explicitly that incremental SSG failed
        throw err
    }
}

export default function NotionDomainPage(props: IndexPageProps) {
    return <main>
        <NotionPage {...props} />
    </main>
}