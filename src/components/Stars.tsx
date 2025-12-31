import { useRef, useMemo } from 'react'
import { Points, BufferGeometry, Float32BufferAttribute } from 'three'
import { useFrame } from '@react-three/fiber'

interface StarsProps {
  count?: number
  radius?: number
}

/**
 * 星空コンポーネント
 * 大晦日の夜空を彩る星々
 */
export const Stars: React.FC<StarsProps> = ({
  count = 500,
  radius = 50,
}) => {
  const pointsRef = useRef<Points>(null)

  const geometry = useMemo(() => {
    const geo = new BufferGeometry()
    const positions = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = radius + (Math.random() - 0.5) * 10

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = Math.abs(r * Math.cos(phi)) + 10 // 上半分のみ
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
    }

    geo.setAttribute('position', new Float32BufferAttribute(positions, 3))
    return geo
  }, [count, radius])

  // 星のきらめきアニメーション
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.01
    }
  })

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        color="#FFFFFF"
        size={0.3}
        sizeAttenuation
        transparent
        opacity={0.8}
      />
    </points>
  )
}
