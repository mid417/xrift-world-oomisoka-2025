import { useRef } from 'react'
import { Group, PointLight } from 'three'
import { useFrame } from '@react-three/fiber'
import { COLORS } from '../constants'

interface LanternProps {
  position?: [number, number, number]
  scale?: number
}

/**
 * 提灯コンポーネント
 * ゆらゆら光る和風の提灯
 */
export const Lantern: React.FC<LanternProps> = ({
  position = [0, 0, 0],
  scale = 1,
}) => {
  const groupRef = useRef<Group>(null)
  const lightRef = useRef<PointLight>(null)

  // 光のゆらぎアニメーション
  useFrame((state) => {
    if (lightRef.current) {
      const time = state.clock.elapsedTime
      lightRef.current.intensity = 3 + Math.sin(time * 2) * 0.5
    }
  })

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* 吊り紐 */}
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 0.3, 8]} />
        <meshStandardMaterial color="#333333" />
      </mesh>

      {/* 上部の枠 */}
      <mesh position={[0, 0.45, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.1, 0.05, 16]} />
        <meshStandardMaterial color={COLORS.lantern.frame} />
      </mesh>

      {/* 提灯本体 */}
      <mesh position={[0, 0.25, 0]} castShadow>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial
          color={COLORS.lantern.paper}
          emissive={COLORS.lantern.light}
          emissiveIntensity={0.3}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* 下部の枠 */}
      <mesh position={[0, 0.05, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.08, 0.05, 16]} />
        <meshStandardMaterial color={COLORS.lantern.frame} />
      </mesh>

      {/* 内部の光源 */}
      <pointLight
        ref={lightRef}
        position={[0, 0.25, 0]}
        color={COLORS.lantern.light}
        intensity={3}
        distance={8}
        castShadow
      />
    </group>
  )
}
