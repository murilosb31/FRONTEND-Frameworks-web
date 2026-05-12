
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/FRONTEND-Frameworks-web/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/FRONTEND-Frameworks-web"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 626, hash: '2009b19e4786923defb900d4efaea5c7a5ce87dff32a1a6445b0cb219f0567b1', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 969, hash: '3a3b91937ad0483ba8777f50d5c903d9cbc5fb99bbc5004a6d9ddd7aa02658b4', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 3079, hash: 'c2e5aa86d71b8478048ddc08a1bcd6d1ce042a48b64b8bdbc886c92d6737fa08', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-ZLRHFWXW.css': {size: 648, hash: 'MU9y+2UZ7ig', text: () => import('./assets-chunks/styles-ZLRHFWXW_css.mjs').then(m => m.default)}
  },
};
