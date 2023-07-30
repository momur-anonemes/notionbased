import * as React from 'react'
import { GetStaticProps } from 'next'
import { uuidToId } from 'notion-utils'
import { ParsedUrlQuery } from 'querystring'

import { PageProps } from '@/lib/types'
import { siteConfig } from '@/lib/site.config'
import { getDatabaseWithCache, getPage } from '@/lib/action'
import { NotionPage } from '@/components/NotionPage'

export interface Params extends ParsedUrlQuery {
  slug: string
}

export const getStaticProps: GetStaticProps<PageProps, Params>  = async (context) => {
    try {
        const slug = context.params?.slug as string

        const database = await getDatabaseWithCache()
        const pageId = database.find((v) => v.slug == ('/' + slug) || v.pageId == uuidToId(slug))?.pageId
        if (pageId) {
            const recordMap = await getPage(pageId)
            const props: PageProps = { siteConfig, recordMap }
            return { props, revalidate: 10 }
        }
        throw `Can't find current page`
    } catch (err) {
        console.error('page error', err)
        // we don't want to publish the error version of this page, so
        // let next.js know explicitly that incremental SSG failed
        throw err
    }
}

export async function getStaticPaths() {
    const database = await getDatabaseWithCache()
    const staticPaths = {
      paths: database.filter((p) => p.slug != '/').map((p) => ({
        params: {
          slug: p.slug.slice(1)
        }
      })),
      // paths: [],
      fallback: true
    }
  
    console.log(staticPaths.paths)
    return staticPaths
}

export default function NotionDomainPage(props: PageProps) {
    return <NotionPage {...props} />
}