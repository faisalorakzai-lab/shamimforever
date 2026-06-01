'use client'

  import { Suspense, useRef, useEffect, useMemo } from 'react'
  import { Canvas, useFrame } from '@react-three/fiber'
  import {
    useGLTF,
    Environment,
    ContactShadows,
    MeshReflectorMaterial,
  } from '@react-three/drei'
  import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing'
  import * as THREE from 'three'

  const PARTICLE_COUNT = 45

  function GoldParticles3D() {
    const ref = useRef<THREE.Points>(null)
    const data = useMemo(() => {
      const pos = new Float32Array(PARTICLE_COUNT * 3)
      const vel = new Float32Array(PARTICLE_COUNT)
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        pos[i * 3]     = (Math.random() - 0.5) * 8
        pos[i * 3 + 1] = Math.random() * 6 - 1
        pos[i * 3 + 2] = (Math.random() - 0.5) * 5
        vel[i] = 0.003 + Math.random() * 0.005
      }
      return { pos, vel }
    }, [])

    useFrame(() => {
      if (!ref.current) return
      const attr = ref.current.geometry.attributes.position as THREE.BufferAttribute
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        let y = attr.getY(i) - data.vel[i]
        if (y < -1.5) y += 7.5
        attr.setY(i, y)
      }
      attr.needsUpdate = true
    })

    return (
      <points ref={ref}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={data.pos}
            count={PARTICLE_COUNT}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#c9a054"
          size={0.022}
          transparent
          opacity={0.5}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    )
  }

  function PerfumeBottle({ path }: { path: string }) {
    const groupRef = useRef<THREE.Group>(null)
    const { scene: raw } = useGLTF(path)
    const scene = useMemo(() => raw.clone(true), [raw])

    useEffect(() => {
      if (!groupRef.current) return
      scene.traverse((child) => {
        const mesh = child as THREE.Mesh
        if (mesh.isMesh) {
          mesh.castShadow = true
          mesh.receiveShadow = true
        }
      })
      const box = new THREE.Box3().setFromObject(scene)
      const sz = box.getSize(new THREE.Vector3())
      const maxDim = Math.max(sz.x, sz.y, sz.z)
      if (maxDim > 0) {
        const scale = 2.9 / maxDim
        groupRef.current.scale.setScalar(scale)
        const scaled = new THREE.Box3().setFromObject(groupRef.current)
        const center = scaled.getCenter(new THREE.Vector3())
        groupRef.current.position.set(-center.x, -scaled.min.y, -center.z)
      }
    }, [scene])

    useFrame(({ clock }) => {
      if (!groupRef.current) return
      groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.055) * 0.22
    })

    return (
      <group ref={groupRef}>
        <primitive object={scene} />
      </group>
    )
  }

  function MarblePedestal() {
    const marble = useMemo(
      () =>
        new THREE.MeshPhysicalMaterial({
          color: new THREE.Color('#0d0707'),
          roughness: 0.06,
          metalness: 0.02,
          clearcoat: 1.0,
          clearcoatRoughness: 0.04,
          reflectivity: 0.98,
        }),
      []
    )
    const gold = useMemo(
      () =>
        new THREE.MeshPhysicalMaterial({
          color: new THREE.Color('#c9a054'),
          metalness: 0.97,
          roughness: 0.1,
          clearcoat: 0.6,
          clearcoatRoughness: 0.1,
          envMapIntensity: 2,
        }),
      []
    )

    return (
      <group>
        <mesh castShadow receiveShadow material={marble}>
          <cylinderGeometry args={[0.72, 0.88, 0.42, 64]} />
        </mesh>
        <mesh material={gold} position={[0, 0.225, 0]}>
          <torusGeometry args={[0.73, 0.032, 16, 64]} />
        </mesh>
        <mesh material={gold} position={[0, -0.225, 0]}>
          <torusGeometry args={[0.89, 0.032, 16, 64]} />
        </mesh>
        <mesh castShadow receiveShadow material={marble} position={[0, 0.237, 0]}>
          <cylinderGeometry args={[0.70, 0.72, 0.034, 64]} />
        </mesh>
      </group>
    )
  }

  function CinematicCamera() {
    useFrame(({ camera, clock }) => {
      const t = clock.elapsedTime
      camera.position.x = Math.sin(t * 0.04) * 0.5
      camera.position.y = 1.5 + Math.sin(t * 0.065) * 0.09
      camera.position.z = 4.6 + Math.sin(t * 0.028) * 0.18
      ;(camera as THREE.PerspectiveCamera).lookAt(0, 0.9, 0)
    })
    return null
  }

  interface Props { modelPath: string }

  export default function ShamimBloom3DScene({ modelPath }: Props) {
    return (
      <Canvas
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.25,
        }}
        camera={{ position: [0, 1.5, 4.6], fov: 38 }}
        shadows="soft"
        dpr={[1, 1.5]}
        style={{ position: 'absolute', inset: 0, background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.18} color="#fff0e0" />

          {/* Warm gold key light */}
          <directionalLight
            position={[4, 7, 3]}
            intensity={3.8}
            color="#ffd480"
            castShadow
            shadow-mapSize={[1024, 1024] as unknown as number}
            shadow-bias={-0.0005}
            shadow-camera-near={0.5}
            shadow-camera-far={20}
            shadow-camera-left={-3}
            shadow-camera-right={3}
            shadow-camera-top={4}
            shadow-camera-bottom={-3}
          />

          {/* Soft pink fill light */}
          <pointLight position={[-4.5, 2, 3]} intensity={2.8} color="#ff88aa" decay={2} />

          {/* Rear luxury rim highlight */}
          <pointLight position={[0, 5, -5.5]} intensity={3} color="#fff0fa" decay={2} />

          {/* Crystal crown top light */}
          <spotLight
            position={[0, 9, 0.5]}
            intensity={2.2}
            color="#ffe8c0"
            angle={0.2}
            penumbra={0.65}
            decay={2}
          />

          {/* Warm side accent */}
          <pointLight position={[4.5, 0, 1.5]} intensity={0.7} color="#ffd480" decay={2} />

          {/* Studio environment reflections */}
          <Environment preset="night" />

          {/* Cinematic camera drift */}
          <CinematicCamera />

          {/* Floating gold particles */}
          <GoldParticles3D />

          {/* Perfume bottle — positioned on pedestal top */}
          <group position={[0, 0.275, 0]}>
            <PerfumeBottle path={modelPath} />
          </group>

          {/* Museum pedestal */}
          <MarblePedestal />

          {/* Black marble floor reflection */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.24, 0]} receiveShadow>
            <planeGeometry args={[14, 14]} />
            <MeshReflectorMaterial
              blur={[300, 100]}
              resolution={512}
              mixBlur={0.85}
              mixStrength={0.55}
              roughness={0.96}
              depthScale={1.2}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.4}
              color="#040101"
              metalness={0.55}
              mirror={0.35}
            />
          </mesh>

          {/* Grounding contact shadow */}
          <ContactShadows
            position={[0, -0.23, 0]}
            opacity={1}
            scale={6}
            blur={3.5}
            far={3}
            color="#000000"
          />

          {/* Post processing */}
          <EffectComposer>
            <DepthOfField
              focusDistance={0.014}
              focalLength={0.042}
              bokehScale={2.5}
              height={480}
            />
            <Bloom
              luminanceThreshold={0.62}
              luminanceSmoothing={0.88}
              intensity={0.75}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    )
  }
  