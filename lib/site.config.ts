import config from 'config'

export interface SiteConfig {
  name: string
  host: string

  rootPageId: string

  darkMode?: boolean
  previewImages?: boolean
}

export const siteConfig: SiteConfig = {
    name: config.get('name'),
    host: config.get('host'),

    rootPageId: config.get('rootPageId'),

    darkMode: config.get('darkMode') == 'enabled',
    previewImages: config.get('previewImages') == 'enabled',
}