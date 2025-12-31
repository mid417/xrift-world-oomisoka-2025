import { useRef } from 'react'
import { Group } from 'three'
import { COLORS } from '../constants'

interface KagamiMochiProps {
  position?: [number, number, number]
  scale?: number
}

/**
 * 鏡餅コンポーネント
 * 新年を迎える準備
 */
export const KagamiMochi: React.FC<KagamiMochiProps> = ({
  position = [0, 0, 0],
  scale = 1,
}) => {
  const groupRef = useRef<Group>(null)

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* 台座（三方） */}
      <mesh position={[0, 0.05, 0]} castShadow>
        <boxGeometry args={[0.3, 0.1, 0.3]} />
        <meshStandardMaterial color={COLORS.kagamiMochi.base} />
      </mesh>

      {/* 葉っぱ（裏白） */}
      <mesh position={[0, 0.11, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.15, 8]} />
        <meshStandardMaterial
          color={COLORS.kagamiMochi.leaf}
          side={2}
        />
      </mesh>

      {/* 下の餅 */}
      <mesh position={[0, 0.18, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.14, 0.08, 32]} />
        <meshStandardMaterial color={COLORS.kagamiMochi.mochi} />
      </mesh>

      {/* 上の餅 */}
      <mesh position={[0, 0.27, 0]} castShadow>
        <cylinderGeometry args={[0.09, 0.11, 0.07, 32]} />
        <meshStandardMaterial color={COLORS.kagamiMochi.mochi} />
      </mesh>

      {/* みかん（橙） */}
      <mesh position={[0, 0.36, 0]} castShadow>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color={COLORS.kagamiMochi.orange} />
      </mesh>

      {/* みかんのヘタ */}
      <mesh position={[0, 0.41, 0]} castShadow>
        <cylinderGeometry args={[0.01, 0.015, 0.02, 8]} />
        <meshStandardMaterial color={COLORS.kagamiMochi.leaf} />
      </mesh>
    </group>
  )
}
