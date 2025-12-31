import { useRef } from 'react'
import { Group } from 'three'
import { RigidBody } from '@react-three/rapier'

interface TorouProps {
  position?: [number, number, number]
  scale?: number
}

/**
 * 灯篭（とうろう）コンポーネント
 * 日本庭園風の石灯篭
 */
export const Torou: React.FC<TorouProps> = ({
  position = [0, 0, 0],
  scale = 1,
}) => {
  const groupRef = useRef<Group>(null)

  const stoneColor = '#808080'
  const lightColor = '#FFD54F'

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <RigidBody type="fixed" colliders="cuboid">
        {/* 基礎（台座） */}
        <mesh position={[0, 0.1, 0]} castShadow>
          <boxGeometry args={[0.8, 0.2, 0.8]} />
          <meshStandardMaterial color={stoneColor} roughness={0.9} />
        </mesh>

        {/* 柱 */}
        <mesh position={[0, 0.7, 0]} castShadow>
          <cylinderGeometry args={[0.15, 0.2, 1, 8]} />
          <meshStandardMaterial color={stoneColor} roughness={0.9} />
        </mesh>

        {/* 火袋（ひぶくろ）- 光が漏れる部分 */}
        <mesh position={[0, 1.35, 0]} castShadow>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial
            color={lightColor}
            emissive={lightColor}
            emissiveIntensity={0.5}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* 火袋の枠（格子） */}
        {[-0.2, 0, 0.2].map((x, i) => (
          <mesh key={`v${i}`} position={[x, 1.35, 0.26]} castShadow>
            <boxGeometry args={[0.03, 0.45, 0.02]} />
            <meshStandardMaterial color={stoneColor} roughness={0.9} />
          </mesh>
        ))}
        {[-0.2, 0, 0.2].map((x, i) => (
          <mesh key={`v2${i}`} position={[x, 1.35, -0.26]} castShadow>
            <boxGeometry args={[0.03, 0.45, 0.02]} />
            <meshStandardMaterial color={stoneColor} roughness={0.9} />
          </mesh>
        ))}
        {[-0.2, 0, 0.2].map((z, i) => (
          <mesh key={`h${i}`} position={[0.26, 1.35, z]} castShadow>
            <boxGeometry args={[0.02, 0.45, 0.03]} />
            <meshStandardMaterial color={stoneColor} roughness={0.9} />
          </mesh>
        ))}
        {[-0.2, 0, 0.2].map((z, i) => (
          <mesh key={`h2${i}`} position={[-0.26, 1.35, z]} castShadow>
            <boxGeometry args={[0.02, 0.45, 0.03]} />
            <meshStandardMaterial color={stoneColor} roughness={0.9} />
          </mesh>
        ))}

        {/* 笠（かさ）- 屋根部分 */}
        <mesh position={[0, 1.75, 0]} castShadow>
          <boxGeometry args={[0.7, 0.15, 0.7]} />
          <meshStandardMaterial color={stoneColor} roughness={0.9} />
        </mesh>

        {/* 宝珠（ほうじゅ）- 頂上の飾り */}
        <mesh position={[0, 1.95, 0]} castShadow>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color={stoneColor} roughness={0.9} />
        </mesh>
      </RigidBody>

      {/* 内部の光源 */}
      {/* <pointLight
        position={[0, 1.35, 0]}
        color={lightColor}
        intensity={2}
        distance={8}
      /> */}
    </group>
  )
}
