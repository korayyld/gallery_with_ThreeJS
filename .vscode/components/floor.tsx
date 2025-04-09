const vertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;

  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    vec3 baseColor = vec3(0.95, 0.95, 0.97);
    
    // Add subtle gradient
    float gradient = smoothstep(-5.0, 5.0, vPosition.x);
    vec3 color = mix(baseColor, vec3(0.92, 0.92, 0.95), gradient);
    
    // Add soft pattern
    float pattern = sin(vUv.x * 20.0) * sin(vUv.y * 20.0) * 0.03;
    color += pattern;
    
    gl_FragColor = vec4(color, 1.0);
  }
`

export function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[10, 10]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  )
}

