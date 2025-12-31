import { useRef } from 'react'
import { Group } from 'three'
import { COLORS } from '../constants'

interface SakeSetProps {
  position?: [number, number, number]
  scale?: number
}

/**
 * 日本酒セットコンポーネント
 * 徳利とおちょこのセット
 */
export const SakeSet: React.FC<SakeSetProps> = ({
  position = [0, 0, 0],
  scale = 1,
}) => {
  const groupRef = useRef<Group>(null)

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* 徳利（とっくり） */}
      <group position={[0, 0, 0]}>
        {/* 本体 */}
        <mesh position={[0, 0.15, 0]} castShadow>
          <cylinderGeometry args={[0.06, 0.08, 0.2, 16]} />
          <meshStandardMaterial color={COLORS.sake.bottle} />
        </mesh>
        {/* 首 */}
        <mesh position={[0, 0.28, 0]} castShadow>
          <cylinderGeometry args={[0.03, 0.06, 0.06, 16]} />
          <meshStandardMaterial color={COLORS.sake.bottle} />
        </mesh>
        {/* ラベル */}
        <mesh position={[0, 0.15, 0.065]} castShadow>
          <boxGeometry args={[0.06, 0.1, 0.01]} />
          <meshStandardMaterial color={COLORS.sake.label} />
        </mesh>
      </group>

      {/* おちょこ 1 */}
      <group position={[0.15, 0, 0.1]}>
        <mesh position={[0, 0.025, 0]} castShadow>
          <cylinderGeometry args={[0.035, 0.025, 0.05, 16]} />
          <meshStandardMaterial color={COLORS.sake.cup} />
        </mesh>
        {/* お酒 */}
        <mesh position={[0, 0.04, 0]}>
          <cylinderGeometry args={[0.032, 0.032, 0.02, 16]} />
          <meshStandardMaterial
            color={COLORS.sake.liquid}
            transparent
            opacity={0.8}
          />
        </mesh>
      </group>

      {/* おちょこ 2 */}
      <group position={[-0.15, 0, 0.1]}>
        <mesh position={[0, 0.025, 0]} castShadow>
          <cylinderGeometry args={[0.035, 0.025, 0.05, 16]} />
          <meshStandardMaterial color={COLORS.sake.cup} />
        </mesh>
        {/* お酒 */}
        <mesh position={[0, 0.04, 0]}>
          <cylinderGeometry args={[0.032, 0.032, 0.02, 16]} />
          <meshStandardMaterial
            color={COLORS.sake.liquid}
            transparent
            opacity={0.8}
          />
        </mesh>
      </group>

      {/* おちょこ 3 */}
      <group position={[0, 0, 0.2]}>
        <mesh position={[0, 0.025, 0]} castShadow>
          <cylinderGeometry args={[0.035, 0.025, 0.05, 16]} />
          <meshStandardMaterial color={COLORS.sake.cup} />
        </mesh>
      </group>
    </group>
  )
}
