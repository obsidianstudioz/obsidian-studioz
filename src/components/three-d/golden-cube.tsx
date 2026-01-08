"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import { useDeviceProfile } from "@/components/hooks";

export type GoldenCubeProps = {
  /** Tailwind / custom classes for the outer container */
  className?: string;
  /** Cube size in world units */
  size?: number;
  /** Spin speed (radians per second) */
  spinSpeed?: number;
  /** Initial tilt (radians) */
  tilt?: [number, number, number];
};

function SpinningCube({
  size = 1.8,
  spinSpeed = 0.65,
  tilt = [0.6, 0.45, 0.25],
  isLowPower = false,
}: Pick<GoldenCubeProps, "size" | "spinSpeed" | "tilt"> & {
  isLowPower?: boolean;
}) {
  const cubeRef = useRef<THREE.Mesh>(null);
  // Reduce spin speed on low-power devices
  const effectiveSpeed = isLowPower ? spinSpeed * 0.6 : spinSpeed;

  const cubeGeo = useMemo(
    () => new THREE.BoxGeometry(size, size, size, 1, 1, 1),
    [size],
  );
  const cubeMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#f59e0b"),
        metalness: 0.85,
        roughness: 0.25,
        clearcoat: isLowPower ? 0 : 0.9,
        clearcoatRoughness: 0.15,
        emissive: new THREE.Color("#ea580c"),
        emissiveIntensity: 0.12,
      }),
    [isLowPower],
  );

  useFrame((_, delta) => {
    if (!cubeRef.current) return;
    cubeRef.current.rotation.x += delta * (effectiveSpeed * 0.6);
    cubeRef.current.rotation.y += delta * effectiveSpeed;
    cubeRef.current.rotation.z += delta * (effectiveSpeed * 0.35);
  });

  return (
    <mesh
      ref={cubeRef}
      geometry={cubeGeo}
      material={cubeMat}
      rotation={tilt}
      castShadow={!isLowPower}
      receiveShadow={!isLowPower}
    />
  );
}

export default function GoldenCube({
  className = "h-96 w-full",
  size,
  spinSpeed,
  tilt,
}: GoldenCubeProps) {
  const { isLowPower, prefersReducedMotion } = useDeviceProfile();

  // Performance tuning based on device
  const canvasDpr: [number, number] = isLowPower ? [1, 1] : [1, 2];
  const effectiveSpinSpeed = prefersReducedMotion ? 0 : spinSpeed;

  const glConfig = useMemo<THREE.WebGLRendererParameters>(
    () => ({
      antialias: !isLowPower,
      powerPreference: isLowPower ? "low-power" : "high-performance",
    }),
    [isLowPower],
  );

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={canvasDpr}
        shadows={!isLowPower}
        gl={glConfig}
        frameloop="always"
      >
        <ambientLight intensity={0.55} />
        <directionalLight
          position={[4, 5, 6]}
          intensity={1.6}
          color="#ffd166"
          castShadow={!isLowPower}
        />
        <directionalLight
          position={[-3, -2, 2]}
          intensity={0.8}
          color="#f97316"
        />
        {!isLowPower && (
          <spotLight
            position={[0, 5, 5]}
            angle={0.6}
            penumbra={0.4}
            intensity={1.2}
            color="#ff9f1c"
            castShadow
          />
        )}
        <Suspense fallback={null}>
          <Environment preset="sunset" resolution={isLowPower ? 64 : 128} />
          <SpinningCube
            size={size}
            spinSpeed={effectiveSpinSpeed}
            tilt={tilt}
            isLowPower={isLowPower}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
