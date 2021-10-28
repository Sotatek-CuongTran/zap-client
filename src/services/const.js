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
  { label: 'USDT-DAI', value: process.env.VUE_APP_PAIR01},
  { label: 'USDT-WETH', value: process.env.VUE_APP_PAIR02},
  { label: 'WETH-WMATIC', value: process.env.VUE_APP_PAIR23},
  { label: 'DAI-WMATIC', value: process.env.VUE_APP_PAIR13},
  { label: 'USDT-ATOM', value: process.env.VUE_APP_PAIR04},
  { label: 'DAI-ATOM', value: process.env.VUE_APP_PAIR14},
]
