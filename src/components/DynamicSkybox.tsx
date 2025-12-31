import { useState, useEffect, useMemo } from 'react'
import { Skybox } from '@xrift/world-components'

/**
 * 時間帯別の空の色定義
 * 日本の空の明るさに近い状態を再現
 */
const SKY_COLORS: Array<{
  hour: number
  topColor: number
  bottomColor: number
}> = [
  // 深夜 (0-4時)
  { hour: 0, topColor: 0x0a0a20, bottomColor: 0x1a1a3a },
  { hour: 4, topColor: 0x0a0a20, bottomColor: 0x1a1a3a },
  // 薄明 (4-5時)
  { hour: 5, topColor: 0x1a1a40, bottomColor: 0x2a2a5a },
  // 日の出前 (5-6時)
  { hour: 6, topColor: 0x4a3a60, bottomColor: 0x7a5a80 },
  // 日の出 (6-7時)
  { hour: 7, topColor: 0xff9966, bottomColor: 0xffb088 },
  // 朝 (7-9時)
  { hour: 8, topColor: 0x87ceeb, bottomColor: 0xb0e0e6 },
  { hour: 9, topColor: 0x6ab0de, bottomColor: 0x9cd0e8 },
  // 日中 (9-16時)
  { hour: 10, topColor: 0x4a90d9, bottomColor: 0x87ceeb },
  { hour: 16, topColor: 0x4a90d9, bottomColor: 0x87ceeb },
  // 夕方 (16-17時)
  { hour: 17, topColor: 0xff7e5f, bottomColor: 0xfeb47b },
  // 日没 (17-18時)
  { hour: 18, topColor: 0xff5f6d, bottomColor: 0xd45a6a },
  // 薄暮 (18-19時)
  { hour: 19, topColor: 0x3a3a60, bottomColor: 0x5a4a7a },
  // 夜 (19-24時)
  { hour: 20, topColor: 0x1a1a30, bottomColor: 0x2a2a4a },
  { hour: 24, topColor: 0x0a0a20, bottomColor: 0x1a1a3a },
]

/**
 * 2つの色を補間する
 */
const lerpColor = (color1: number, color2: number, t: number): number => {
  const r1 = (color1 >> 16) & 0xff
  const g1 = (color1 >> 8) & 0xff
  const b1 = color1 & 0xff

  const r2 = (color2 >> 16) & 0xff
  const g2 = (color2 >> 8) & 0xff
  const b2 = color2 & 0xff

  const r = Math.round(r1 + (r2 - r1) * t)
  const g = Math.round(g1 + (g2 - g1) * t)
  const b = Math.round(b1 + (b2 - b1) * t)

  return (r << 16) | (g << 8) | b
}

/**
 * 現在時刻から空の色を計算
 */
const getSkyColors = (date: Date): { topColor: number; bottomColor: number } => {
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const currentTime = hours + minutes / 60

  // 現在時刻の前後の色定義を探す
  let prevColor = SKY_COLORS[SKY_COLORS.length - 1]
  let nextColor = SKY_COLORS[0]

  for (let i = 0; i < SKY_COLORS.length - 1; i++) {
    if (currentTime >= SKY_COLORS[i].hour && currentTime < SKY_COLORS[i + 1].hour) {
      prevColor = SKY_COLORS[i]
      nextColor = SKY_COLORS[i + 1]
      break
    }
  }

  // 補間係数を計算
  const range = nextColor.hour - prevColor.hour
  const t = range > 0 ? (currentTime - prevColor.hour) / range : 0

  return {
    topColor: lerpColor(prevColor.topColor, nextColor.topColor, t),
    bottomColor: lerpColor(prevColor.bottomColor, nextColor.bottomColor, t),
  }
}

/**
 * 15分単位で丸めた時刻を取得
 */
const getRoundedTime = (date: Date): string => {
  const hours = date.getHours()
  const minutes = Math.floor(date.getMinutes() / 15) * 15
  return `${hours}:${minutes}`
}

/**
 * 時刻に応じて色が変化するSkybox
 * 15分ごとに判定し、日本の空の明るさに近い状態を再現
 */
export const DynamicSkybox: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(() => getRoundedTime(new Date()))

  // 15分ごとに時刻を更新
  useEffect(() => {
    const checkTime = () => {
      const newTime = getRoundedTime(new Date())
      if (newTime !== currentTime) {
        setCurrentTime(newTime)
      }
    }

    // 1分ごとにチェック（15分境界を逃さないため）
    const interval = setInterval(checkTime, 60000)
    return () => clearInterval(interval)
  }, [currentTime])

  // 現在の空の色を計算（15分単位でのみ再計算）
  const { topColor, bottomColor } = useMemo(() => {
    return getSkyColors(new Date())
  }, [currentTime])

  return <Skybox topColor={topColor} bottomColor={bottomColor} />
}
