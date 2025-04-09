import React from 'react'
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface ModernLightProps {
  position: [number, number, number]
  color: string
}

export function ModernLight({ position, color }: ModernLightProps) {
  const lightRef = React.useRef<THREE.PointLight>(null)
  const glowRef = React.useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (lightRef.current && glowRef.current) {
      const intensity = 1 + Math.sin(clock.getElapsedTime() * 2) * 0.2
      lightRef.current.intensity = intensity
      glowRef.current.material.opacity = intensity * 0.5
    }
  })

  return (
    <group position={position}>
      <pointLight ref={lightRef} color={color} intensity={1} distance={5} />
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.5} />
      </mesh>
      <mesh>
        <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
        <meshStandardMaterial color="gray" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  )
}

