import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"

export function HangingPlane() {
  const groupRef = useRef<THREE.Group>(null)
  const propellerRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Gentle swaying motion
      groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.5) * 0.03
      groupRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.3) * 0.03
    }
    if (propellerRef.current) {
      // Spinning propeller
      propellerRef.current.rotation.z += 0.1
    }
  })

  return (
    <group position={[0, 4, -2]}>
      {/* Ceiling mount */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
        <meshStandardMaterial color="black" />
      </mesh>

      {/* Suspension wires */}
      <mesh position={[-0.5, 0, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 1, 4]} />
        <meshStandardMaterial color="silver" metalness={0.8} />
      </mesh>
      <mesh position={[0.5, 0, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 1, 4]} />
        <meshStandardMaterial color="silver" metalness={0.8} />
      </mesh>

      {/* LED Rings */}
      <mesh position={[0, -0.2, 0]}>
        <torusGeometry args={[1.2, 0.05, 16, 32]} />
        <meshStandardMaterial 
          color="#ffffff" 
          emissive="#ffffff"
          emissiveIntensity={1}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[0, -0.4, 0]}>
        <torusGeometry args={[1.4, 0.05, 16, 32]} />
        <meshStandardMaterial 
          color="#ffffff" 
          emissive="#ffffff"
          emissiveIntensity={1}
          toneMapped={false}
        />
      </mesh>

      {/* Main plane group */}
      <group ref={groupRef} position={[0, -0.5, 0]}>
        {/* Plane body */}
        <mesh castShadow>
          <cylinderGeometry args={[0.2, 0.2, 1.5, 8]} />
          <meshStandardMaterial color="#1a237e" metalness={0.4} roughness={0.6} />
        </mesh>

        {/* Wings */}
        <mesh castShadow position={[0, 0, 0]}>
          <boxGeometry args={[1.8, 0.05, 0.4]} />
          <meshStandardMaterial color="#1a237e" metalness={0.4} roughness={0.6} />
        </mesh>

        {/* Tail */}
        <mesh castShadow position={[0, 0, -0.7]}>
          <boxGeometry args={[0.6, 0.05, 0.3]} />
          <meshStandardMaterial color="#1a237e" metalness={0.4} roughness={0.6} />
        </mesh>

        {/* Vertical stabilizer */}
        <mesh castShadow position={[0, 0.2, -0.7]}>
          <boxGeometry args={[0.05, 0.4, 0.3]} />
          <meshStandardMaterial color="#1a237e" metalness={0.4} roughness={0.6} />
        </mesh>

        {/* Cockpit */}
        <mesh castShadow position={[0, 0.1, 0.3]}>
          <sphereGeometry args={[0.15, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#8d6e63" metalness={0.6} roughness={0.4} />
        </mesh>

        {/* Propeller group */}
        <group ref={propellerRef} position={[0, 0, 0.75]}>
          <mesh castShadow>
            <boxGeometry args={[0.8, 0.1, 0.02]} />
            <meshStandardMaterial color="#ffd700" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
            <boxGeometry args={[0.8, 0.1, 0.02]} />
            <meshStandardMaterial color="#ffd700" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>

        {/* Landing gear */}
        <mesh castShadow position={[-0.3, -0.3, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.3, 8]} />
          <meshStandardMaterial color="#424242" />
        </mesh>
        <mesh castShadow position={[0.3, -0.3, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.3, 8]} />
          <meshStandardMaterial color="#424242" />
        </mesh>
        
        {/* Wheels */}
        <mesh castShadow position={[-0.3, -0.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.05, 16]} />
          <meshStandardMaterial color="black" />
        </mesh>
        <mesh castShadow position={[0.3, -0.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.05, 16]} />
          <meshStandardMaterial color="black" />
        </mesh>
      </group>
    </group>
  )
}

