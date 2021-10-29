// export const tokens = [
//   process.env.VUE_APP_TOKEN0,
//   process.env.VUE_APP_TOKEN1,
//   process.env.VUE_APP_TOKEN2,
//   process.env.VUE_APP_TOKEN3,
//   process.env.VUE_APP_TOKEN4,
// ];

// export const pairs = [
//   process.env.VUE_APP_PAIR01,
//   process.env.VUE_APP_PAIR02,
//   process.env.VUE_APP_PAIR23,
//   process.env.VUE_APP_PAIR13,
//   process.env.VUE_APP_PAIR04,
//   process.env.VUE_APP_PAIR14,
// ]

export const tokens = [
  { label: 'USDT', value: process.env.VUE_APP_TOKEN0 },
  { label: 'DAI', value: process.env.VUE_APP_TOKEN1 },
  { label: 'WETH', value: process.env.VUE_APP_TOKEN2 },
  { label: 'WMATIC', value: process.env.VUE_APP_TOKEN3 },
  { label: 'ATOM', value: process.env.VUE_APP_TOKEN4 },
];

export const pairs = [
  { label: 'USDT-DAI', re_label: 'DAI-USDT', value: process.env.VUE_APP_PAIR01 },
  { label: 'USDT-WETH', re_label: 'WETH-USDT', value: process.env.VUE_APP_PAIR02 },
  { label: 'WETH-WMATIC', re_label: 'WMATIC-WETH', value: process.env.VUE_APP_PAIR23 },
  { label: 'DAI-WMATIC', re_label: 'WMATIC-DAI', value: process.env.VUE_APP_PAIR13 },
  { label: 'USDT-WMATIC', re_label: 'WMATIC-USDT', value: process.env.VUE_APP_PAIR03 },
  { label: 'DAI-WETH', re_label: 'WETH-DAI', value: process.env.VUE_APP_PAIR12 },
  { label: 'ATOM-WETH', re_label: 'WETH-ATOM', value: process.env.VUE_APP_PAIR24 },
]
