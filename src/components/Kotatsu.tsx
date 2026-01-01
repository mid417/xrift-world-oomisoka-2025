import { RigidBody } from '@react-three/rapier'
import { useMemo, useRef } from 'react'
import { BufferAttribute, BufferGeometry, DoubleSide, Group } from 'three'
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
  const tableTopCenterY = legHeight + blanketThickness + tableHeight / 2
  const blanketTopY =
    tableTopCenterY - tableHeight * 0.05 - blanketThickness / 2
  const blanketDrop = blanketTopY // 地面(y=0)まで垂らす
  const blanketSlopeTan = Math.tan(Math.PI / 6) // 30deg
  const blanketGeometry = useMemo(() => {
    const geometry = new BufferGeometry()
    const topHalf = tableSize / 2
    const bottomHalf = topHalf + blanketDrop / blanketSlopeTan
    const yTop = blanketTopY
    const yBottom = blanketTopY - blanketDrop

    const positions = new Float32Array([
      // 上面 (4)
      -topHalf,
      yTop,
      -topHalf,
      topHalf,
      yTop,
      -topHalf,
      topHalf,
      yTop,
      topHalf,
      -topHalf,
      yTop,
      topHalf,
      // 下面 (4)
      -bottomHalf,
      yBottom,
      -bottomHalf,
      bottomHalf,
      yBottom,
      -bottomHalf,
      bottomHalf,
      yBottom,
      bottomHalf,
      -bottomHalf,
      yBottom,
      bottomHalf,
    ])

    const indices = [
      // 上面
      0,
      1,
      2,
      0,
      2,
      3,
      // 北側
      0,
      1,
      5,
      0,
      5,
      4,
      // 東側
      1,
      2,
      6,
      1,
      6,
      5,
      // 南側
      2,
      3,
      7,
      2,
      7,
      6,
      // 西側
      3,
      0,
      4,
      3,
      4,
      7,
      // 下面
      4,
      5,
      6,
      4,
      6,
      7,
    ]

    geometry.setIndex(indices)
    geometry.setAttribute('position', new BufferAttribute(positions, 3))
    geometry.computeVertexNormals()
    return geometry
  }, [blanketDrop, blanketTopY, tableSize])

  return (
    <group ref={groupRef} position={position}>
      {/* こたつ布団 */}
      <mesh position={[0, blanketTopY - 0.02, 0]} >
        <boxGeometry args={[tableSize, blanketThickness, tableSize]} />
        <meshStandardMaterial color={COLORS.kotatsu.blanket} />
      </mesh>
      <mesh geometry={blanketGeometry}>
        <meshStandardMaterial color={COLORS.kotatsu.blanket} side={DoubleSide} />
      </mesh>

      {/* こたつ天板 */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh
          position={[0, legHeight + blanketThickness + tableHeight / 2 - 0.03, 0]}
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
        >
          <boxGeometry args={[0.1 * scale, legHeight, 0.1 * scale]} />
          <meshStandardMaterial color={COLORS.kotatsu.legs} />
        </mesh>
      ))}

      {/* こたつの中の暖かい光 */}
      {/* <pointLight
        position={[0, legHeight / 2, 0]}
        color="#FF6B35"
        intensity={2}
        distance={3}
      /> */}
    </group>
  )
}
