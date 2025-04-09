"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { Suspense } from "react"
import { Gallery } from "./components/gallery"
import { LoadingScreen } from "./components/loading-screen"

export default function ArtGallery() {
  return (
    <div className="w-full h-screen">
      <Canvas shadows gl={{ alpha: false }} camera={{ position: [0, 2, 5] }}>
        <Suspense fallback={<LoadingScreen />}>
          <PerspectiveCamera makeDefault position={[0, 2, 5]} />
          <OrbitControls 
            enableDamping
            dampingFactor={0.05}
            minDistance={3}
            maxDistance={10}
            maxPolarAngle={Math.PI / 2}
          />
          <Gallery />
        </Suspense>
      </Canvas>
    </div>
  )
}

