import {  useRef } from 'react'
import { Group } from 'three'
import { RigidBody } from '@react-three/rapier'
import { Interactable, useInstanceState, ScreenShareDisplay, Mirror } from '@xrift/world-components'


export interface MirrorScreenButtonProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
}

export const MirrorScreenButton = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}: MirrorScreenButtonProps) => {
  const groupRef = useRef<Group>(null)
  const size: [number, number] = [5 * scale, 2.8 * scale]

  // インスタンス全体で同期されるフラグ
  const [isMirror, setIsMirror] = useInstanceState<boolean>('mirror-on', true)

  const handleClick = (id: string) => {
    console.log(`${id} がクリックされました！`)
    if (isMirror) {
       console.log("画面共有に切り替えます")
     } else {
       console.log("ミラー表示に切り替えます")
     }
    
    setIsMirror(!isMirror)
  }
  
  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      <Interactable
        id="screen-button"
        onInteract={handleClick}
        interactionText={isMirror ? "画面共有に切替" : "ミラーに切替"}
      >
        <mesh scale={scale} position={[3 * scale, -0.7 * scale, -0.22 * scale]}>
          <boxGeometry args={[0.3 * scale, 0.5 * scale, 0.1 * scale]} />
          <meshStandardMaterial color={isMirror ? '#ff0000': '#00ff00'} />
        </mesh>
      </Interactable>

      {/* 鏡のフレーム */}
      <mesh position={[0, 0, -0.1]}>
        <boxGeometry args={[size[0] + 0.2, size[1] + 0.2, 0.15]} />
        <meshLambertMaterial color="#333333" />
      </mesh>

      {/* ミラー */}
      {isMirror && (
        <Mirror
          position={[0, 0, 0.001]}
          size={size}
        />
      )}

      {/* スクリーン */}
      {!isMirror && (
        <ScreenShareDisplay id="mirror-screen"
          position={[0, 0, 0.001]}
          width={5 * scale}
        />
      )}

      {/* コライダー */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, 0, -0.05]} visible={false}>
          <boxGeometry args={[size[0], size[1], 0.1]} />
        </mesh>
      </RigidBody>

   </group>
  )
}
