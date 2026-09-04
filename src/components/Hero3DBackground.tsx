'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

const PARTICLE_COUNT = 800;

function WaveParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  // x/z stay fixed for the life of the effect, so they are generated once and
  // only the y component is recomputed each frame.
  const { positions, xz } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const xz = new Float32Array(PARTICLE_COUNT * 2);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = (Math.random() - 0.5) * 25;
      const z = (Math.random() - 0.5) * 10;
      positions[i * 3] = x;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = z;
      xz[i * 2] = x;
      xz[i * 2 + 1] = z;
    }

    return { positions, xz };
  }, []);

  useFrame((state) => {
    const points = pointsRef.current;
    if (!points) return;

    const attribute = points.geometry.attributes.position as THREE.BufferAttribute;
    const array = attribute.array as Float32Array;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = xz[i * 2];
      const z = xz[i * 2 + 1];
      array[i * 3 + 1] =
        Math.sin(x * 0.3 + time * 0.5) * Math.cos(z * 0.3 + time * 0.3) * 2;
    }

    attribute.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#60A5FA" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

export default function Hero3DBackground() {
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setAnimate(!query.matches);

    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return (
    <div className="absolute inset-0 h-full w-full" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ position: 'absolute', inset: 0 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
        dpr={[1, 1.5]}
        // Render a single frame when the visitor prefers reduced motion.
        frameloop={animate ? 'always' : 'demand'}
      >
        <WaveParticles />
      </Canvas>
    </div>
  );
}
