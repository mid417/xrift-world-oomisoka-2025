import { useRef } from 'react'
import { Group } from 'three'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'

interface NewYearClockProps {
  position?: [number, number, number]
  scale?: number
}

/**
 * 年越しカウントダウン時計
 * 2025年12月31日の時刻を表示
 */
export const NewYearClock: React.FC<NewYearClockProps> = ({
  position = [0, 0, 0],
  scale = 1,
}) => {
  const groupRef = useRef<Group>(null)
  const textRef = useRef<any>(null)
  const dateRef = useRef<any>(null)

  // 現在時刻を更新
  useFrame(() => {
    const now = new Date()
    if (textRef.current) {
      const hours = now.getHours().toString().padStart(2, '0')
      const minutes = now.getMinutes().toString().padStart(2, '0')
      const seconds = now.getSeconds().toString().padStart(2, '0')
      textRef.current.text = `${hours}:${minutes}:${seconds}`
    }
    if (dateRef.current) {
      const year = now.getFullYear()
      const month = (now.getMonth() + 1).toString().padStart(2, '0')
      const day = now.getDate().toString().padStart(2, '0')
      dateRef.current.text = `${year}年${month}月${day}日`
    }
  })

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* 時計の枠 */}
      <mesh position={[0, 0, -0.05]} castShadow>
        <boxGeometry args={[1.4, 0.6, 0.1]} />
        <meshStandardMaterial color="#8B0000" />
      </mesh>

      {/* 時計の文字盤背景 */}
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[1.2, 0.4]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* 時刻表示 */}
      <Text
        ref={textRef}
        position={[0, 0, 0.02]}
        fontSize={0.25}
        color="#00FF00"
        anchorX="center"
        anchorY="middle"
      >
        23:59:59
      </Text>

      {/* 日付ラベル */}
      <Text
        ref={dateRef}
        position={[0, 0.4, 0.02]}
        fontSize={0.1}
        color="#FFD700"
        anchorX="center"
        anchorY="middle"
      >
        2025年12月31日
      </Text>
    </group>
  )
}
