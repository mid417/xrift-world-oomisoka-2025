import { useRef } from 'react'
import { Group } from 'three'

interface OtsumamiProps {
  position?: [number, number, number]
  scale?: number
}

/**
 * おつまみコンポーネント
 * お酒のお供
 */
export const Otsumami: React.FC<OtsumamiProps> = ({
  position = [0, 0, 0],
  scale = 1,
}) => {
  const groupRef = useRef<Group>(null)

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* 小皿 */}
      <mesh position={[0, 0.01, 0]} receiveShadow>
        <cylinderGeometry args={[0.12, 0.1, 0.02, 32]} />
        <meshStandardMaterial color="#FFFFF0" />
      </mesh>

      {/* 枝豆風のおつまみ */}
      {[
        [0, 0.03, 0],
        [0.03, 0.03, 0.03],
        [-0.03, 0.03, 0.02],
        [0.02, 0.03, -0.03],
        [-0.02, 0.03, -0.02],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} castShadow>
          <capsuleGeometry args={[0.015, 0.03, 4, 8]} />
          <meshStandardMaterial color="#228B22" />
        </mesh>
      ))}

      {/* 別の小皿（おせんべい風） */}
      <group position={[0.3, 0, 0]}>
        <mesh position={[0, 0.01, 0]} receiveShadow>
          <cylinderGeometry args={[0.1, 0.08, 0.02, 32]} />
          <meshStandardMaterial color="#DEB887" />
        </mesh>
        {/* せんべい */}
        {[0, 0.4, 0.8].map((rot, i) => (
          <mesh
            key={i}
            position={[0, 0.04, 0]}
            rotation={[0.2, rot * Math.PI, 0.1 * i]}
            castShadow
          >
            <cylinderGeometry args={[0.04, 0.04, 0.01, 16]} />
            <meshStandardMaterial color="#D2691E" />
          </mesh>
        ))}
      </group>
    </group>
  )
}
