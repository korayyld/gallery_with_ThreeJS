import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"

interface SculptureProps {
  position: [number, number, number]
  rotation: number
}

export function Sculpture({ position, rotation }: SculptureProps) {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.5
    }
  })

  return (
    <group ref={groupRef} position={position} rotation={[0, rotation, 0]}>
      {/* Base */}
      <mesh position={[0, 0.25, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.5, 32]} />
        <meshStandardMaterial color="white" />
      </mesh>
      
      {/* Abstract Sculpture */}
      <mesh position={[0, 1.25, 0]} castShadow>
        <torusKnotGeometry args={[0.2, 0.1, 128, 16]} />
        <meshStandardMaterial 
          color="white"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </group>
  )
}

