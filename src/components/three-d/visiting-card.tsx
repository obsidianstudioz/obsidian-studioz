"use client";

import React, { useRef, useMemo, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { ThreeEvent } from "@react-three/fiber";
import { RoundedBox, Text, Environment } from "@react-three/drei";
import * as THREE from "three";
import { useDeviceProfile } from "@/components/hooks";

const CARD_WIDTH = (3.5 * 2) / 2;
const CARD_HEIGHT = (2 * 2) / 2;
const CARD_DEPTH = 0.08;

type ContactInfo = {
  icon: string;
  label: string;
  value: string;
  href: string;
};

const CONTACTS: ContactInfo[] = [
  {
    icon: "✉",
    label: "Email",
    value: "hello@obsidianstudioz.com",
    href: "mailto:hello@obsidianstudioz.com",
  },
  {
    icon: "☎",
    label: "Phone",
    value: "+91 98765 43210",
    href: "tel:+919876543210",
  },
  {
    icon: "📷",
    label: "Instagram",
    value: "@obsidianstudioz",
    href: "https://instagram.com/obsidianstudioz",
  },
  {
    icon: "💬",
    label: "WhatsApp",
    value: "+91 98765 43210",
    href: "https://wa.me/919876543210",
  },
];

function Card({
  onContactClick,
  isLowPower = false,
  prefersReducedMotion = false,
}: {
  onContactClick: (href: string) => void;
  isLowPower?: boolean;
  prefersReducedMotion?: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Materials
  const cardMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#18181b"),
        metalness: 0.0,
        roughness: 0.0,
        clearcoat: isLowPower ? 0 : 1,
        clearcoatRoughness: 0.08,
      }),
    [isLowPower],
  );

  // Idle float + rotate (reduced on low power / reduced motion)
  useFrame((state) => {
    if (!groupRef.current) return;
    if (prefersReducedMotion) return;
    const t = state.clock.elapsedTime;
    const factor = isLowPower ? 0.5 : 1;
    groupRef.current.rotation.y = Math.sin(t * 0.4 * factor) * 0.12;
    groupRef.current.rotation.x = Math.cos(t * 0.35 * factor) * 0.06 + 0.1;
    groupRef.current.position.y = Math.sin(t * 0.6 * factor) * 0.08;
  });

  return (
    <group ref={groupRef} scale={hovered ? 1.04 : 1}>
      {/* Card body */}
      <RoundedBox
        args={[CARD_WIDTH, CARD_HEIGHT, CARD_DEPTH]}
        radius={0.02}
        smoothness={isLowPower ? 4 : 10}
        material={cardMat}
        castShadow={!isLowPower}
        receiveShadow={!isLowPower}
      />

      {/* Brand name - CENTERED */}
      <Text
        position={[
          0, // Centered on X-axis
          CARD_HEIGHT / 2 - 0.28,
          CARD_DEPTH / 2 + 0.01,
        ]}
        font={"/title.ttf"}
        fontSize={0.22} // Slightly increased for impact
        color="#f59e0b"
        anchorX="center" // Anchor point is the center
        anchorY="top"
        textAlign="center"
      >
        Obsidian Studioz
      </Text>

      {/* Tagline - CENTERED */}
      {/* <Text
        position={[
          0, // Centered on X-axis
          CARD_HEIGHT / 2 - 0.55, // Adjusted Y position
          CARD_DEPTH / 2 + 0.01,
        ]}
        font={"/title.ttf"}
        fontSize={0.08}
        color="#a1a1aa"
        anchorX="center" // Anchor point is the center
        anchorY="top"
        letterSpacing={0.12}
        textAlign="center"
      >
        DIGITAL DESIGN STUDIO
      </Text> */}

      {/* Contact lines - PADDED */}
      {CONTACTS.map((c, i) => (
        <group
          key={c.label}
          position={[
            -CARD_WIDTH / 2 + 0.4, // Increased from 0.22 to add padding
            -0 - i * 0.25, // Increased spacing between lines
            CARD_DEPTH / 2 + 0.01,
          ]}
        >
          <Text fontSize={0.14} color="#f59e0b" anchorX="left" anchorY="middle">
            {c.icon}
          </Text>
          <Text
            position={[0.25, 0, 0]} // Increased spacing from icon
            fontSize={0.09}
            color="#fafafa"
            anchorX="left"
            anchorY="middle"
            onClick={(e: ThreeEvent<MouseEvent>) => {
              e.stopPropagation();
              onContactClick(c.href);
            }}
            onPointerOver={(e: ThreeEvent<PointerEvent>) => {
              (e.object as THREE.Mesh).material = new THREE.MeshBasicMaterial({
                color: "#fb923c",
              });
              document.body.style.cursor = "pointer";
            }}
            onPointerOut={(e: ThreeEvent<PointerEvent>) => {
              (e.object as THREE.Mesh).material = new THREE.MeshBasicMaterial({
                color: "#fafafa",
              });
              document.body.style.cursor = "auto";
            }}
          >
            {c.value}
          </Text>
        </group>
      ))}
    </group>
  );
}
export type VisitingCard3DProps = {
  className?: string;
};

export default function VisitingCard3D({
  className = "",
}: VisitingCard3DProps) {
  const { isLowPower, prefersReducedMotion } = useDeviceProfile();

  // Performance tuning
  const canvasDpr: [number, number] = isLowPower ? [1, 1] : [1, 2];

  const glConfig = useMemo<THREE.WebGLRendererParameters>(
    () => ({
      antialias: !isLowPower,
      powerPreference: isLowPower ? "low-power" : "high-performance",
    }),
    [isLowPower],
  );

  const handleContactClick = (href: string) => {
    window.open(href, "_blank", "noopener");
  };

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 50 }}
        dpr={canvasDpr}
        shadows={!isLowPower}
        gl={glConfig}
        frameloop="always"
      >
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1.4}
          color="#ffffff"
          castShadow={!isLowPower}
        />
        <directionalLight
          position={[-4, -2, 3]}
          intensity={0.6}
          color="#f59e0b"
        />
        {!isLowPower && (
          <spotLight
            position={[0, 4, 4]}
            angle={0.5}
            penumbra={0.5}
            intensity={0.8}
            color="#fbbf24"
            castShadow
          />
        )}
        <Suspense fallback={null}>
          <Environment preset="city" resolution={isLowPower ? 64 : 128} />
          <Card
            onContactClick={handleContactClick}
            isLowPower={isLowPower}
            prefersReducedMotion={prefersReducedMotion}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
