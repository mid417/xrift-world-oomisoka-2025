import { RigidBody } from '@react-three/rapier'
import { COLORS, WORLD_CONFIG } from './constants'
import { SpawnPoint } from '@xrift/world-components'
import {
  Kotatsu,
  SakeSet,
  KagamiMochi,
  Lantern,
  TatamiRoom,
  Zabuton,
  Otsumami,
  NewYearClock,
  Stars,
  Torou,
  DynamicSkybox,
} from './components'
import { MirrorScreenButton } from './components/Mirrro-Screen'

export interface WorldProps {
  position?: [number, number, number]
  scale?: number
}

/**
 * 大晦日まったりワールド
 * 2025年12月31日、みんなでお酒を飲みながら年越しを待つ空間
 */
export const World: React.FC<WorldProps> = ({ position = [0, 0, 0], scale = 1 }) => {
  const worldSize = WORLD_CONFIG.size * scale

  // 座布団の色バリエーション
  const zabutonColors = ['#4A0080', '#800020', '#003366', '#2F4F4F']

  return (
    <group position={position} scale={scale}>
      {/* プレイヤーのスポーン地点 */}
      <SpawnPoint position={[0, 0, 12]} yaw={0} />

      {/* 時刻に応じて変化する空 */}
      <DynamicSkybox />

      {/* 星空 */}
      <Stars count={200} radius={200} />

      {/* 照明設定 - 暖かい雰囲気 */}
      <ambientLight intensity={0.15} color="#FFE4C4" />
      <directionalLight
        position={[5, 15, 10]}
        intensity={0.3}
        color="#B0C4DE"
        castShadow
        shadow-mapSize-width={32}
        shadow-mapSize-height={32}
        shadow-camera-far={50}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
        shadow-bias={-0.0005}
      />

      {/* 月明かり */}
      <pointLight
        position={[20, 30, -20]}
        intensity={0.5}
        color="#E6E6FA"
        distance={100}
      />

      {/* 地面（雪景色） */}
      <RigidBody type="fixed" colliders="cuboid" restitution={0} friction={0.5}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
          <planeGeometry args={[worldSize, worldSize]} />
          <meshStandardMaterial color={COLORS.ground} />
        </mesh>
      </RigidBody>

      {/* 畳の部屋 */}
      <TatamiRoom position={[0, 0, 0]} scale={scale} />

      {/* こたつ */}
      <Kotatsu position={[0, 0, 0]} scale={scale} />

      {/* 座布団（こたつの周り） */}
      <Zabuton position={[0, 0.04, 1.5]} color={zabutonColors[0]} />
      <Zabuton position={[0, 0.04, -1.5]} color={zabutonColors[1]} rotation={[0, Math.PI, 0]} />
      <Zabuton position={[1.5, 0.04, 0]} color={zabutonColors[2]} rotation={[0, -Math.PI / 2, 0]} />
      <Zabuton position={[-1.5, 0.04, 0]} color={zabutonColors[3]} rotation={[0, Math.PI / 2, 0]} />

      {/* こたつの上のお酒セット */}
      <SakeSet position={[0.3, 0.55, 0.2]} scale={1.2} />
      <SakeSet position={[-0.4, 0.55, -0.3]} scale={1.0} />

      {/* おつまみ */}
      <Otsumami position={[-0.3, 0.55, 0.3]} scale={1.0} />
      <Otsumami position={[0.4, 0.55, -0.2]} scale={0.9} />

      {/* 鏡餅（部屋の隅） */}
      <KagamiMochi position={[3, 0, -3]} scale={1.5} />
      <KagamiMochi position={[-3, 0, -3]} scale={1.2} />

      {/* 提灯 */}
      <Lantern position={[2.55, 2.5, -2.05]} scale={1.0} />
      <Lantern position={[-2.36, 2.5, -2.02]} scale={1.0} />
      {/* <Lantern position={[0, 2.8, -3.5]} scale={1.2} /> */}

      {/* 縁側の提灯 */}
      <Lantern position={[2.48, 2.2, 2.35]} scale={0.8} />
      <Lantern position={[-2.48, 2.2, 2.53]} scale={0.8} />

      {/* 年越しカウントダウン時計 */}
      <NewYearClock position={[0, 2.2, -3.9]} scale={1.0} />

      {/* 追加の雰囲気用ライト */}
      <pointLight
        position={[0, 1.5, 0]}
        color="#FFA500"
        intensity={1}
        distance={6}
      />

      {/* 西の壁のミラー/スクリーン */}
      <MirrorScreenButton
        position={[-3.8, 1.5, 0]}
        rotation={[0, Math.PI / 2, 0]}
        scale={0.8}
      />

      {/* 四隅の灯篭 */}
      <Torou position={[12, 0, 12]} scale={1.2} />
      <Torou position={[-12, 0, 12]} scale={1.2} />
      <Torou position={[12, 0, 0]} scale={1.2} />
      <Torou position={[-12, 0, 0]} scale={1.2} />
      <Torou position={[12, 0, -12]} scale={1.2} />
      <Torou position={[-12, 0, -12]} scale={1.2} />
    </group>
  )
}
