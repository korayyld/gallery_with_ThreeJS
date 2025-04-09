import React from 'react'

export function Walls() {
  return (
    <group>
      {/* Back Wall */}
      <mesh position={[0, 2.5, -5]}>
        <boxGeometry args={[10, 5, 0.2]} />
        <meshStandardMaterial color="#f8f8f8" />
      </mesh>
      
      {/* Left Wall */}
      <mesh position={[-5, 2.5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[10, 5, 0.2]} />
        <meshStandardMaterial color="#f8f8f8" />
      </mesh>
      
      {/* Right Wall */}
      <mesh position={[5, 2.5, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[10, 5, 0.2]} />
        <meshStandardMaterial color="#f8f8f8" />
      </mesh>
    </group>
  )
}

