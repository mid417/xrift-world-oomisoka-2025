import { RigidBody } from '@react-three/rapier'
import { useRef } from 'react'
import { Group } from 'three'
import { COLORS } from '../constants'

interface TatamiRoomProps {
  position?: [number, number, number]
  scale?: number
}

/**
 * 畳の部屋コンポーネント
 * 日本的な和室の床と壁
 */
export const TatamiRoom: React.FC<TatamiRoomProps> = ({
  position = [0, 0, 0],
  scale = 1,
}) => {
  const groupRef = useRef<Group>(null)

  const roomWidth = 8 * scale
  const roomDepth = 8 * scale
  const wallHeight = 3 * scale
  // 部屋を4x4の畳で埋めるサイズ
  const tatamiWidth = 2 * scale
  const tatamiDepth = 1 * scale

  // 畳を敷き詰める
  const tatamis: [number, number, boolean][] = []
  for (let x = -2; x <= 1; x++) {
    for (let z = -2; z <= 1; z++) {
      const rotate = (x + z) % 2 === 0
      tatamis.push([x * tatamiWidth + tatamiWidth / 2, z * tatamiDepth * 2 + tatamiDepth, rotate])
    }
  }

  // こたつ布団が床に当たらないよう中央に穴を開けた床コライダーを生成
  const kotatsuTableSize = 2 * scale
  const kotatsuTableHeight = 0.4 * scale
  const kotatsuLegHeight = 0.3 * scale
  const kotatsuBlanketThickness = 0.05 * scale
  const kotatsuBlanketTopY =
    kotatsuLegHeight +
    kotatsuBlanketThickness +
    kotatsuTableHeight / 2 -
    kotatsuTableHeight * 0.05 -
    kotatsuBlanketThickness / 2
  const kotatsuBlanketDrop = kotatsuBlanketTopY
  const kotatsuBlanketSlopeTan = Math.tan(Math.PI / 6) // 30deg
  const kotatsuBottomHalf =
    kotatsuTableSize / 2 + kotatsuBlanketDrop / kotatsuBlanketSlopeTan
  const holeMargin = 0.2 * scale
  const holeHalfX = Math.min(roomWidth / 2, kotatsuBottomHalf + holeMargin)
  const holeHalfZ = Math.min(roomDepth / 2, kotatsuBottomHalf + holeMargin)
  const holeWidth = holeHalfX * 2
  const holeDepth = holeHalfZ * 2
  const floorThickness = 0.1
  const floorY = -floorThickness / 2

  const frameParts: Array<{ position: [number, number, number]; size: [number, number, number] }> = []
  const sideWidth = (roomWidth - holeWidth) / 2
  const sideDepth = (roomDepth - holeDepth) / 2

  if (sideWidth > 0) {
    frameParts.push({ position: [-(holeHalfX + sideWidth / 2), floorY, 0], size: [sideWidth, floorThickness, roomDepth] })
    frameParts.push({ position: [holeHalfX + sideWidth / 2, floorY, 0], size: [sideWidth, floorThickness, roomDepth] })
  }
  if (sideDepth > 0) {
    frameParts.push({ position: [0, floorY, -(holeHalfZ + sideDepth / 2)], size: [holeWidth, floorThickness, sideDepth] })
    frameParts.push({ position: [0, floorY, holeHalfZ + sideDepth / 2], size: [holeWidth, floorThickness, sideDepth] })
  }

  return (
    <group ref={groupRef} position={position}>
      {/* 畳 */}
      {tatamis.map(([x, z, rotate], index) => (
        <group key={index} position={[x, 0, z]} rotation={[0, rotate ? Math.PI / 2 : 0, 0]}>
          {/* 畳本体 */}
          <mesh position={[0, 0.02, 0]} receiveShadow>
            <boxGeometry args={[tatamiWidth - 0.005, 0.04, tatamiDepth * 2 - 0.005]} />
            <meshStandardMaterial color={COLORS.tatami} />
          </mesh>
          {/* 畳の縁 */}
          {/* <mesh position={[0, 0.025, tatamiDepth - 0.03]} receiveShadow>
            <boxGeometry args={[tatamiWidth - 0.02, 0.05, 0.06]} />
            <meshStandardMaterial color={COLORS.tatamiEdge} />
          </mesh>
          <mesh position={[0, 0.025, -tatamiDepth + 0.03]} receiveShadow>
            <boxGeometry args={[tatamiWidth - 0.02, 0.05, 0.06]} />
            <meshStandardMaterial color={COLORS.tatamiEdge} />
          </mesh> */}
        </group>
      ))}

      {/* 床の当たり判定 */}
      <RigidBody type="fixed" colliders="cuboid">
        {frameParts.map((part, idx) => (
          <mesh key={idx} position={part.position}>
            <boxGeometry args={part.size} />
            <meshStandardMaterial color={COLORS.wood} visible={false} />
          </mesh>
        ))}
      </RigidBody>

      {/* 奥の壁（障子風） */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, wallHeight / 2, -roomDepth / 2]}>
          <boxGeometry args={[roomWidth, wallHeight, 0.1]} />
          <meshStandardMaterial color="#F5F5DC" />
        </mesh>
      </RigidBody>

      {/* 障子の枠 */}
      {[-3, -1, 1, 3].map((x, i) => (
        <mesh key={i} position={[x * scale, wallHeight / 2, -roomDepth / 2 + 0.06]}>
          <boxGeometry args={[0.05, wallHeight, 0.02]} />
          <meshStandardMaterial color={COLORS.wood} />
        </mesh>
      ))}
      {[0.5, 1.5, 2.5].map((y, i) => (
        <mesh key={i} position={[0, y * scale, -roomDepth / 2 + 0.06]}>
          <boxGeometry args={[roomWidth, 0.03, 0.02]} />
          <meshStandardMaterial color={COLORS.wood} />
        </mesh>
      ))}

      {/* 左の壁 */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[-roomWidth / 2, wallHeight / 2, 0]}>
          <boxGeometry args={[0.1, wallHeight, roomDepth]} />
          <meshStandardMaterial color={COLORS.woodLight} />
        </mesh>
      </RigidBody>

      {/* 右の壁 */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[roomWidth / 2, wallHeight / 2, 0]}>
          <boxGeometry args={[0.1, wallHeight, roomDepth]} />
          <meshStandardMaterial color={COLORS.woodLight} />
        </mesh>
      </RigidBody>

      {/* 縁側（手前側） */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, -0.1, roomDepth / 2 + 1]}>
          <boxGeometry args={[roomWidth, 0.1, 2]} />
          <meshStandardMaterial color={COLORS.engawa} />
        </mesh>
      </RigidBody>
    </group>
  )
}
