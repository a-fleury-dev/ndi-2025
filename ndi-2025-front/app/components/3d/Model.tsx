import React, { useRef } from 'react';
// @ts-ignore
import type { GroupProps } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';

interface ModelProps extends GroupProps {
    url: string;
    rotating?: boolean;
    position?: [number, number, number];
    scale?: number | [number, number, number];
}

export default function Model({ url, rotating = true, position = [0, 0, 0], scale = 1, ...rest }: ModelProps) {
    const { scene } = useGLTF(url);
    const groupRef = useRef<Group>(null);

    useFrame((_, delta) => {
        if (rotating && groupRef.current) {
            groupRef.current.rotation.y += delta * 0.5;
        }
    });

    return (
        <group ref={groupRef} position={position} scale={scale} {...rest}>
            <primitive object={scene} />
        </group>
    );
}
