import { RigidBody } from '@react-three/rapier'
import { useRef } from 'react'
import { Mesh } from 'three'

interface ZabutonProps {
  position?: [number, number, number]
  color?: string
  rotation?: [number, number, number]
}

/**
 * 座布団コンポーネント
 * こたつの周りに置く座布団
 */
export const Zabuton: React.FC<ZabutonProps> = ({
  position = [0, 0, 0],
  color = '#4A0080',
  rotation = [0, 0, 0],
}) => {
  const meshRef = useRef<Mesh>(null)

  return (
    <RigidBody type="fixed" colliders="cuboid">
      <mesh
        ref={meshRef}
        position={position}
        rotation={rotation}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[0.6, 0.08, 0.6]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </RigidBody>
  )
}
