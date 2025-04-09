import { useFrame, useLoader } from "@react-three/fiber"
import { useRef, useState } from "react"
import * as THREE from "three"

interface ArtworkProps {
  position: [number, number, number]
  rotation: [number, number, number]
  size: [number, number]
  imageUrl: string
}

export function Artwork({ position, rotation, size, imageUrl }: ArtworkProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const texture = useLoader(THREE.TextureLoader, imageUrl)

  useFrame(() => {
    if (meshRef.current && hovered) {
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        rotation[1] + 0.1,
        0.1
      )
    }
  })

  return (
    <group position={position} rotation={rotation}>
      {/* Frame */}
      <mesh
        ref={meshRef}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        castShadow
      >
        <boxGeometry args={[size[0] + 0.1, size[1] + 0.1, 0.1]} />
        <meshStandardMaterial color="gold" metalness={0.5} roughness={0.3} />
      </mesh>
      
      {/* Artwork Canvas */}
      <mesh position={[0, 0, -0.051]}>
        <planeGeometry args={[size[0], size[1]]} />
        <meshStandardMaterial map={texture} />
      </mesh>
    </group>
  )
}

