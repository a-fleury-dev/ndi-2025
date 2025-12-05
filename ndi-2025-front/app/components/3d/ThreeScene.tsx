// typescript
// `ndi-2025-front/app/components/3d/ThreeScene.tsx`
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Model from './Model';

interface ThreeSceneProps {
    modelUrl: string;
    backgroundColor?: string;
    rotating?: boolean;
    position?: [number, number, number];
    scale?: number | [number, number, number];
}

export default function ThreeScene({
                                       modelUrl,
                                       backgroundColor = '#1a1a2e',
                                       rotating = true,
                                       position = [0, 0, 0],
                                       scale = 1
                                   }: ThreeSceneProps) {
    const isTransparent = backgroundColor === 'transparent';

    return (
        <Canvas
            camera={{ position: [0, 2, 5], fov: 50 }}
            style={{ width: '100%', height: '100%', background: isTransparent ? 'transparent' : undefined }}
            gl={{ antialias: true, alpha: isTransparent }}
        >
            {!isTransparent && <color attach="background" args={[backgroundColor]} />}
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <Suspense fallback={null}>
                <Model url={modelUrl} rotating={rotating} position={position} scale={scale} />
            </Suspense>
            <OrbitControls />
        </Canvas>
    );
}
