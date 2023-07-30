import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { NotionRenderer } from 'react-notion-x'

import * as types from '@/lib/types'

export const NotionPage: React.FC<types.PageProps> = ({
  siteConfig,
  recordMap
}) => {
  const components = React.useMemo(
    () => ({
      nextImage: Image,
      nextLink: Link,
    }),
    []
  )

  if (!siteConfig || !recordMap) {
    return <div></div>
  }

  return (
    <>
      <NotionRenderer
        components={components}
        recordMap={recordMap}
        rootPageId={siteConfig.rootPageId}
        rootDomain={siteConfig.host}
        fullPage={true}
        previewImages={!!recordMap.preview_images}
        showCollectionViewDropdown={false}
        showTableOfContents={false}
        minTableOfContentsItems={3}
      />
    </>
  )
}