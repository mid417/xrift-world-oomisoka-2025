export const WORLD_CONFIG = {
  size: 30,
  wallHeight: 5,
  wallThickness: 0.5,
} as const

// 大晦日のまったりワールド用カラー
export const COLORS = {
  // 畳の色
  tatami: '#8B9556',
  tatamiEdge: '#2F4F2F',
  // 木の色
  wood: '#8B4513',
  woodDark: '#5C3317',
  woodLight: '#DEB887',
  // こたつ
  kotatsu: {
    table: '#512c09',
    blanket: '#DC143C',
    legs: '#5C3317',
  },
  // お酒関連
  sake: {
    bottle: '#FFFFF0',
    label: '#8B0000',
    cup: '#FFFFF0',
    liquid: '#FFF8DC',
  },
  // 鏡餅
  kagamiMochi: {
    mochi: '#FFFAF0',
    orange: '#FF8C00',
    leaf: '#228B22',
    base: '#8B4513',
  },
  // 提灯
  lantern: {
    paper: '#FFE4B5',
    frame: '#8B0000',
    light: '#FFD700',
  },
  // 夜空
  sky: {
    top: '#0a0a20',
    bottom: '#1a1a3a',
  },
  // 地面（雪）
  ground: '#b4b4b4',
  // 縁側
  engawa: '#7b5b31',
} as const
