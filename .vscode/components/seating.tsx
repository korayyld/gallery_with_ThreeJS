import { useRef } from "react"
import * as THREE from "three"

interface SeatingProps {
  position: [number, number, number]
}

export function Seating({ position }: SeatingProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  return (
    <group position={position}>
      {/* Truncated Sphere Seat */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <sphereGeometry args={[1, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
        <meshStandardMaterial 
          color="#e0e0e0"
          metalness={0.2}
          roughness={0.8}
        />
      </mesh>
      
      {/* Base */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.3, 0.5, 0.2, 32]} />
        <meshStandardMaterial 
          color="#d0d0d0"
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>
    </group>
  )
}

