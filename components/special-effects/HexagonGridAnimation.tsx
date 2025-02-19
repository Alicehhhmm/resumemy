'use client'

import { useTransition, useState } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { Canvas } from '@react-three/fiber'
import { AccumulativeShadows, RandomizedLight, Center, Environment, OrbitControls } from '@react-three/drei'

export const HexagonGridAnimation = () => {
    return (
        <div className='w-full h-screen bg-fluo-deep dark:bg-fluo-background'>
            <Canvas shadows camera={{ position: [0, 0, 4.5], fov: 50 }}>
                <ambientLight intensity={0.8} />
                <pointLight position={[0, 0, 100]} intensity={0.5} color='#ffc900' />
                <OrbitControls
                    autoRotate
                    autoRotateSpeed={4}
                    enablePan={false}
                    enableZoom={false}
                    minPolarAngle={Math.PI / 2.1}
                    maxPolarAngle={Math.PI / 2.1}
                />
                <Env />
                {/* TODO: HexGrid */}
                <group position={[0, -0.65, 0]}>
                    <Sphere />
                    <AccumulativeShadows temporal frames={200} color='purple' colorBlend={0.5} opacity={1} scale={10} alphaTest={0.85}>
                        <RandomizedLight amount={8} radius={5} ambient={0.5} position={[5, 3, 2]} bias={0.001} />
                    </AccumulativeShadows>
                    <Sphere />
                </group>
            </Canvas>
        </div>
    )
}

function Sphere() {
    return (
        <Center top>
            <mesh castShadow>
                <sphereGeometry args={[0.75, 64, 64]} />
                <meshStandardMaterial metalness={1} roughness={0.5} />
            </mesh>
        </Center>
    )
}

function Env() {
    return <Environment preset={'sunset'} background blur={0.65} />
}

export default HexagonGridAnimation
