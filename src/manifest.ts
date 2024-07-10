import { defineManifest } from '@crxjs/vite-plugin';
import packageData from '../package.json';

const isDev = process.env.NODE_ENV == 'development';

export const manifest = defineManifest({
  name: `${packageData.displayName || packageData.name}${isDev ? ` ➡️ Dev` : ''}`,
  description: packageData.description,
  version: packageData.version,
  manifest_version: 3,
  icons: {
    16: 'img/icon.png',
    32: 'img/icon.png',
    48: 'img/icon.png',
    128: 'img/icon.png'
  },
  action: {
    default_popup: 'popup.html',
    default_icon: 'img/icon.png'
  },
  options_page: 'options.html',
  devtools_page: 'devtools.html',
  background: {
    service_worker: 'src/background/index.ts',
    type: 'module'
  },
  content_scripts: [
    {
      matches: ['http://*/*', 'https://*/*'],
      js: ['src/contentScript/index.ts']
    },
    {
      matches: ['https://www.google.com/*'],
      js: ['src/contentScript/googleRender.tsx']
    }
  ],
  side_panel: {
    default_path: 'sidepanel.html'
  },
  web_accessible_resources: [
    {
      resources: [
        'img/icon.png',
        'img/icon.png',
        'img/icon.png',
        'img/icon.png'
      ],
      matches: []
    }
  ],
  permissions: ['sidePanel', 'storage'],
  chrome_url_overrides: {
    newtab: 'newtab.html'
  },
  externally_connectable: {
    matches: ['http://127.0.0.1:5500/page-test/index.html']
  }
});
