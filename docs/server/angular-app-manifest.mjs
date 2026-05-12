
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/FRONTEND-Frameworks-web/browser/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/FRONTEND-Frameworks-web/browser"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 634, hash: '5569d81def9553230c1971c8ed9811118910a1a8e43841b68cba21efb6ed82b8', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 977, hash: '0ec4ea1d7298104aaf7b405ac4a4b8d28b8f9300315c236c6dd557404fa8b3f5', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 3087, hash: 'ec8bed609394f73a9eb6ffcdedcb8f7b48d708df3e164698adfa4bce4a86ea7e', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-ZLRHFWXW.css': {size: 648, hash: 'MU9y+2UZ7ig', text: () => import('./assets-chunks/styles-ZLRHFWXW_css.mjs').then(m => m.default)}
  },
};
