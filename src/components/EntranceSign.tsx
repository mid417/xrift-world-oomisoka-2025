import { Text } from '@react-three/drei'
import { COLORS } from '../constants'

interface EntranceSignProps {
  position?: [number, number, number]
  scale?: number
}

// 入口で案内を表示する看板
export const EntranceSign: React.FC<EntranceSignProps> = ({ position = [0, 0, 0], scale = 1 }) => {
  const boardWidth = 1.8 * scale
  const boardHeight = 1 * scale
  const boardThickness = 0.1 * scale
  const poleHeight = 0.6 * scale

  return (
    <group position={position}>
      {/* 看板の板 */}
      <mesh position={[0, poleHeight + boardHeight / 2, 0]} castShadow>
        <boxGeometry args={[boardWidth, boardHeight, boardThickness]} />
        <meshStandardMaterial color={COLORS.woodLight} />
      </mesh>

      {/* 支柱 */}
      <mesh position={[0, poleHeight / 2, 0]} castShadow>
        <boxGeometry args={[0.18 * scale, poleHeight, 0.18 * scale]} />
        <meshStandardMaterial color={COLORS.wood} />
      </mesh>

      {/* 台座 */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[0.5 * scale, 0.08 * scale, 0.5 * scale]} />
        <meshStandardMaterial color={COLORS.woodDark} />
      </mesh>

      {/* 案内文言 */}
      <Text
        position={[0, poleHeight + boardHeight / 2, boardThickness / 2 + 0.001]}
        fontSize={0.1 * scale}
        lineHeight={1.25}
        color="#1a1a1a"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.5 * scale}
      >
        {`重い場合は設定で\n「低画質」を選択してください。`}
      </Text>
    </group>
  )
}
