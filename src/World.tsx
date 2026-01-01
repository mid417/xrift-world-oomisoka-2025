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
  EntranceSign,
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
      <SpawnPoint position={[0, 0.1, 12.5]} yaw={0} />
      {/* 入口の案内看板 */}
      <EntranceSign position={[0, 0.04, 10]} scale={1.05} />

      {/* 時刻に応じて変化する空 */}
      <DynamicSkybox />

      {/* 星空 */}
      <Stars count={200} radius={200} />

      {/* 照明設定 - スポットライトなしで全体を明るめに */}
      <hemisphereLight args={["#FFE4C4", "#3A3A50", 0.5]} />
      <ambientLight intensity={0.4} color="#FFF1E0" />
      <directionalLight
        position={[5, 15, 10]}
        intensity={0.55}
        color="#DDE6FF"
        castShadow
        shadow-mapSize-width={64}
        shadow-mapSize-height={64}
        shadow-camera-far={50}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
        shadow-bias={-0.0005}
      />

      {/* 地面（雪景色） */}
      <RigidBody type="fixed" colliders="cuboid" restitution={0} friction={0.5}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
          <planeGeometry args={[worldSize, worldSize]} />
          <meshStandardMaterial color={COLORS.ground} />
        </mesh>
      </RigidBody>

      {/* 畳の部屋 */}
      <TatamiRoom position={[0, 0.5, 0]} scale={scale} />

      {/* こたつ */}
      <Kotatsu position={[0, 0.52, 0]} scale={scale} />

      {/* 座布団（こたつの周り） */}
      <Zabuton position={[0, 0.55, 1.8]} color={zabutonColors[0]} />
      <Zabuton position={[0, 0.55, -1.8]} color={zabutonColors[1]} rotation={[0, Math.PI, 0]} />
      <Zabuton position={[1.8, 0.55, 0]} color={zabutonColors[2]} rotation={[0, -Math.PI / 2, 0]} />
      <Zabuton position={[-1.8, 0.55, 0]} color={zabutonColors[3]} rotation={[0, Math.PI / 2, 0]} />

      {/* こたつの上のお酒セット */}
      <SakeSet position={[0.3, 1.05, 0.2]} scale={1.2} />
      <SakeSet position={[-0.4, 1.05, -0.3]} scale={1.0} />

      {/* おつまみ */}
      <Otsumami position={[-0.3, 1.06, 0.3]} scale={1.0} />
      <Otsumami position={[0.4, 1.05, -0.2]} scale={0.9} />

      {/* 鏡餅（部屋の隅） */}
      <KagamiMochi position={[3, 0.5, -3]} scale={1.5} />
      <KagamiMochi position={[-3, 0.5, -3]} scale={1.2} />

      {/* 提灯 */}
      <Lantern position={[2.36, 3.0, -2.0]} scale={1.0} />
      <Lantern position={[-2.36, 3.0, -2.0]} scale={1.0} />
      <Lantern position={[2.36, 3.0, 2.0]} scale={0.8} />
      <Lantern position={[-2.36, 3.0, 2.0]} scale={0.8} />

      {/* 年越しカウントダウン時計 */}
      <NewYearClock position={[0, 2.7, -3.9]} scale={1.0} />

      {/* 西の壁のミラー/スクリーン */}
      <MirrorScreenButton
        position={[-3.8, 2.0, 0]}
        rotation={[0, Math.PI / 2, 0]}
        scale={0.8}
      />

      {/* 追加の雰囲気用ライト */}
      {/* <pointLight
        position={[0, 1.5, 0]}
        color="#FFA500"
        intensity={1}
        distance={6}
      /> */}

      {/* 灯篭 */}
      <Torou position={[  8, 0,  12]} scale={1.2} />
      <Torou position={[ -8, 0,  12]} scale={1.2} />
      <Torou position={[ 12, 0,   0]} scale={1.2} />
      <Torou position={[-12, 0,   0]} scale={1.2} />
      <Torou position={[  8, 0, -12]} scale={1.2} />
      <Torou position={[ -8, 0, -12]} scale={1.2} />
    </group>
  )
}
