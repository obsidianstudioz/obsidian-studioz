"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import { useDeviceProfile } from "@/components/hooks";

interface RockProps {
  scrollProgress: number;
  idleRotationSpeed: number;
  isMobile: boolean;
}

function SharpCrystal({
  scrollProgress,
  idleRotationSpeed,
  isMobile,
}: RockProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  const crystalGeometry = useMemo(() => {
    const geo = new THREE.OctahedronGeometry(1, 0);
    const positions = geo.attributes.position as THREE.BufferAttribute;

    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      const z = positions.getZ(i);
      positions.setXYZ(i, x * 0.7, y * 1.6, z * 0.7);
    }

    geo.computeVertexNormals();
    return geo;
  }, []);

  // Glass material - simplified on mobile (no transmission = huge perf boost)
  const glassMaterial = useMemo(() => {
    if (isMobile) {
      // Simplified material for mobile - looks good but renders fast
      return new THREE.MeshStandardMaterial({
        color: new THREE.Color("#f59e0b"),
        metalness: 0.3,
        roughness: 0.2,
        envMapIntensity: 1.2,
        transparent: true,
        opacity: 0.9,
        side: THREE.FrontSide, // Single-sided for perf
      });
    }
    // Full quality for desktop
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#f59e0b"),
      metalness: 0,
      roughness: 0.05,
      transmission: 0.95,
      thickness: 1.5,
      ior: 2.0,
      envMapIntensity: 1.5,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      transparent: true,
      side: THREE.DoubleSide,
    });
  }, [isMobile]);

  // Calculate position, scale, rotation, and visibility based on scroll progress
  const transforms = useMemo(() => {
    let x = 0;
    let s = 1;
    let rotY = 0;
    let rotX = 0;
    let rotZ = 0;
    let visible = true;
    const maxX = Math.min(viewport.width / 2, 4);
    const exitX = viewport.width + 3; // Position off-screen

    if (scrollProgress < 0.25) {
      // Start: Crystal at center, then moves right and grows
      const t = scrollProgress / 0.25;
      x = t * maxX;
      s = 1 + t * 0.8; // 1 to 1.8
      rotY = t * Math.PI * 0.5; // Rotate 90 degrees
      rotX = t * 0.2;
    } else if (scrollProgress < 0.4) {
      // Continue moving right and exit screen
      const t = (scrollProgress - 0.25) / 0.15;
      x = maxX + t * (exitX - maxX);
      s = 1.8 + t * 0.4; // Keep growing as it exits
      rotY = Math.PI * 0.5 + t * Math.PI * 0.5;
      rotX = 0.2 + t * 0.3;
      visible = t < 0.8; // Start fading/disappearing
    } else if (scrollProgress < 0.8) {
      // Hidden phase - crystal is off-screen
      x = exitX;
      s = 0;
      visible = false;
    } else if (scrollProgress < 0.9) {
      // Reappear at center and grow to max size
      const t = (scrollProgress - 0.8) / 0.1;
      x = 0; // Back to center
      s = t * 1; // Grow to size (0 to 1.8)
      rotY = (t * Math.PI) / 5; // Full rotation as it appears
      rotX = 0;
      rotZ = 0;
      visible = true;
    } else {
      // Stay at max size when last section is in middle/end
      x = 0;
      s = 1; // Stay at max size
      rotY = Math.PI / 5; // Keep final rotation
      rotX = 0;
      rotZ = 0;
      visible = true;
    }

    const scale = Math.max(0, Math.min(s, 1.9));

    return { x, scale, rotY, rotX, rotZ, visible };
  }, [scrollProgress, viewport.width]);

  // Invalidate frame when scroll changes (for demand frameloop on mobile)
  const { invalidate } = useThree();
  const prevScrollRef = useRef(scrollProgress);

  // Gentle continuous idle rotation on top of scroll rotation
  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Invalidate on scroll change for demand mode
    if (prevScrollRef.current !== scrollProgress) {
      prevScrollRef.current = scrollProgress;
      invalidate();
    }

    const currentIdleRot = (groupRef.current.userData.idleRot as number) ?? 0;
    const nextIdleRot =
      idleRotationSpeed <= 0 ? 0 : currentIdleRot + delta * idleRotationSpeed;

    groupRef.current.rotation.y = transforms.rotY + nextIdleRot;
    groupRef.current.rotation.x = transforms.rotX;
    groupRef.current.rotation.z = transforms.rotZ;
    groupRef.current.userData.idleRot = nextIdleRot;

    // Keep animating if there's idle rotation
    if (idleRotationSpeed > 0) {
      invalidate();
    }
  });

  return (
    <group
      ref={groupRef}
      position={[transforms.x, 0, 0]}
      scale={transforms.scale}
      visible={transforms.visible}
    >
      {/* Main crystal */}
      <mesh geometry={crystalGeometry} material={glassMaterial} />

      {/* Inner glow core */}
      <mesh geometry={crystalGeometry} scale={0.4}>
        <meshBasicMaterial color="#fbbf24" transparent opacity={0.7} />
      </mesh>

      {/* Edge highlight - skip on mobile */}
      {!isMobile && (
        <mesh geometry={crystalGeometry} scale={1.01}>
          <meshBasicMaterial
            color="#fef3c7"
            transparent
            opacity={0.15}
            wireframe
          />
        </mesh>
      )}

      {/* Secondary crystals - only on desktop for perf */}
      {!isMobile && (
        <>
          <mesh
            geometry={crystalGeometry}
            material={glassMaterial}
            position={[0.5, -0.3, 0.3]}
            rotation={[0.3, 0.5, 0.2]}
            scale={0.4}
          />
          <mesh
            geometry={crystalGeometry}
            material={glassMaterial}
            position={[-0.4, -0.4, -0.2]}
            rotation={[-0.2, -0.4, 0.3]}
            scale={0.35}
          />
          <mesh
            geometry={crystalGeometry}
            material={glassMaterial}
            position={[0.2, 0.5, -0.4]}
            rotation={[0.4, 0.2, -0.3]}
            scale={0.3}
          />
        </>
      )}
    </group>
  );
}

function Scene({
  scrollProgress,
  idleRotationSpeed,
  environmentResolution,
  isMobile,
}: {
  scrollProgress: number;
  idleRotationSpeed: number;
  environmentResolution: number;
  isMobile: boolean;
}) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={2} color="#ffffff" />
      {/* Reduce lights on mobile */}
      {!isMobile && (
        <>
          <directionalLight
            position={[-3, -3, 2]}
            intensity={1}
            color="#fbbf24"
          />
          <pointLight position={[-2, -1, 3]} intensity={1.5} color="#eab308" />
        </>
      )}
      <pointLight position={[0, 2, 4]} intensity={3} color="#f59e0b" />
      <Environment preset="night" resolution={environmentResolution} />
      <SharpCrystal
        scrollProgress={scrollProgress}
        idleRotationSpeed={idleRotationSpeed}
        isMobile={isMobile}
      />
    </>
  );
}

interface GlassRockProps {
  scrollProgress: number;
}

export default function GlassRock({ scrollProgress }: GlassRockProps) {
  const { isMobile, isLowPower, prefersReducedMotion } = useDeviceProfile();

  // Aggressive optimization for mobile
  const idleRotationSpeed = prefersReducedMotion
    ? 0
    : isMobile
      ? 0.05
      : isLowPower
        ? 0.08
        : 0.15;
  const canvasDpr: [number, number] = isMobile
    ? [0.75, 1]
    : isLowPower
      ? [1, 1.25]
      : [1, 2];
  const environmentResolution = isMobile ? 64 : isLowPower ? 128 : 256;

  const glConfig = useMemo<THREE.WebGLRendererParameters>(
    () => ({
      antialias: !isMobile && !isLowPower, // No antialiasing on mobile
      alpha: false,
      powerPreference: isMobile
        ? "low-power"
        : isLowPower
          ? "low-power"
          : "high-performance",
      precision: isMobile ? "lowp" : "highp", // Lower precision on mobile
    }),
    [isMobile, isLowPower],
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={canvasDpr}
        frameloop={isMobile ? "demand" : "always"} // Only render on demand on mobile
        gl={glConfig}
      >
        <color attach="background" args={["#09090b"]} />
        <Suspense fallback={null}>
          <Scene
            scrollProgress={scrollProgress}
            idleRotationSpeed={idleRotationSpeed}
            environmentResolution={environmentResolution}
            isMobile={isMobile}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
