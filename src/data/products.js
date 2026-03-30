// Aneurysm, Liver 제외
export const productRoutes = [
  { id: 'gbm', path: '/gbm', anchor: 'module-pbt' },
  { id: 'mets', path: '/mets', anchor: 'module-bm' },
  { id: 'hn', path: '/hn', anchor: 'module-hn' },
  { id: 'stroke', path: '/stroke', anchor: 'module-stroke' },
  { id: 'aira', path: '/aira', anchor: 'module-aria' },
  { id: 'pd', path: '/pd', anchor: 'module-pd' },
  { id: 'ms', path: '/ms', anchor: 'module-ms' },
]

export const productMenu = [
  {
    titleKey: 'oncology',
    items: [
      { id: 'gbm', nameKey: 'glioblastoma', nameEn: 'DYNAPEX BT' },
      { id: 'mets', nameKey: 'brainMetastasis', nameEn: 'DYNAPEX METS' },
      { id: 'hn', nameKey: 'headNeck', nameEn: 'DYNAPEX HN' },
    ],
  },
  {
    titleKey: 'vascular',
    items: [{ id: 'stroke', nameKey: 'stroke', nameEn: 'CERCARE STROKE' }],
  },
  {
    titleKey: 'degenerative',
    items: [
      { id: 'aira', nameKey: 'aria', nameEn: 'DYNAPEX AD' },
      { id: 'pd', nameKey: 'parkinsons', nameEn: 'DYNAPEX PD' },
    ],
  },
  {
    titleKey: 'demyelinating',
    items: [{ id: 'ms', nameKey: 'multipleSclerosis', nameEn: 'DYNAPEX MS' }],
  },
]
