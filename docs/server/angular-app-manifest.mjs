
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
    'index.csr.html': {size: 634, hash: '15201334fa6a72ab5286dc1ff2cb11d60c5d6e196b48bc73d9b88bce5463e985', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 977, hash: 'd271313af681a3d2cf8bd34d3387f1b19b1985bc5ca8a78d2813a2d5b430661c', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 3087, hash: 'cffacdfd43efb86e762df90a0c3b7470b9cef754f92eb141d60a778013e19ed6', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-ZLRHFWXW.css': {size: 648, hash: 'MU9y+2UZ7ig', text: () => import('./assets-chunks/styles-ZLRHFWXW_css.mjs').then(m => m.default)}
  },
};
