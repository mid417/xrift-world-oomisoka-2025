import { RigidBody } from '@react-three/rapier'
import { useRef } from 'react'
import { Group } from 'three'
import { COLORS } from '../constants'

interface KotatsuProps {
  position?: [number, number, number]
  scale?: number
}

/**
 * こたつコンポーネント
 * 大晦日にみんなで囲むこたつ
 */
export const Kotatsu: React.FC<KotatsuProps> = ({
  position = [0, 0, 0],
  scale = 1,
}) => {
  const groupRef = useRef<Group>(null)

  const tableSize = 2 * scale
  const tableHeight = 0.4 * scale
  const legHeight = 0.3 * scale
  const blanketThickness = 0.05 * scale
  const blanketOverhang = 0.5 * scale

  return (
    <group ref={groupRef} position={position}>
      {/* こたつ布団 */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, legHeight + blanketThickness / 2, 0]} castShadow>
          <boxGeometry
            args={[
              tableSize + blanketOverhang * 2,
              blanketThickness,
              tableSize + blanketOverhang * 2,
            ]}
          />
          <meshStandardMaterial color={COLORS.kotatsu.blanket} />
        </mesh>
      </RigidBody>

      {/* こたつ天板 */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh
          position={[0, legHeight + blanketThickness + tableHeight / 2, 0]}
          castShadow
        >
          <boxGeometry args={[tableSize, tableHeight * 0.1, tableSize]} />
          <meshStandardMaterial color={COLORS.kotatsu.table} />
        </mesh>
      </RigidBody>

      {/* 脚（4本） */}
      {[
        [-tableSize / 2 + 0.1, 0, -tableSize / 2 + 0.1],
        [tableSize / 2 - 0.1, 0, -tableSize / 2 + 0.1],
        [-tableSize / 2 + 0.1, 0, tableSize / 2 - 0.1],
        [tableSize / 2 - 0.1, 0, tableSize / 2 - 0.1],
      ].map((legPos, index) => (
        <mesh
          key={index}
          position={[legPos[0], legHeight / 2, legPos[2]]}
          castShadow
        >
          <boxGeometry args={[0.1 * scale, legHeight, 0.1 * scale]} />
          <meshStandardMaterial color={COLORS.kotatsu.legs} />
        </mesh>
      ))}

      {/* こたつの中の暖かい光 */}
      <pointLight
        position={[0, legHeight / 2, 0]}
        color="#FF6B35"
        intensity={2}
        distance={3}
      />
    </group>
  )
}
