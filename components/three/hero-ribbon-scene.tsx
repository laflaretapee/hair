"use client";

import { Float } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import * as THREE from "three";

const points = [
  new THREE.Vector3(-1.8, -1.2, 0.4),
  new THREE.Vector3(-0.8, 0.2, 0.1),
  new THREE.Vector3(0.2, 1.3, -0.3),
  new THREE.Vector3(1.1, 0.4, 0.15),
  new THREE.Vector3(1.9, -1.4, -0.35),
];

const curve = new THREE.CatmullRomCurve3(points);

function RibbonMesh() {
  return (
    <Float speed={0.8} rotationIntensity={0.15} floatIntensity={0.38}>
      <mesh rotation={[0.35, -0.2, -0.55]}>
        <tubeGeometry args={[curve, 180, 0.3, 32, false]} />
        <meshPhysicalMaterial
          clearcoat={1}
          clearcoatRoughness={0.2}
          color="#c58f64"
          metalness={0.08}
          roughness={0.28}
          sheen={1}
          sheenColor="#f1dcc2"
          thickness={1.2}
        />
      </mesh>
      <mesh position={[0.42, 0.16, 0.22]} rotation={[0.25, -0.2, -0.58]}>
        <tubeGeometry args={[curve, 180, 0.16, 24, false]} />
        <meshPhysicalMaterial
          clearcoat={1}
          clearcoatRoughness={0.12}
          color="#f1dac0"
          emissive="#d7ae84"
          emissiveIntensity={0.14}
          roughness={0.16}
        />
      </mesh>
    </Float>
  );
}

function FallbackVisual() {
  return <div className="hero-mobile-fallback" aria-hidden="true" />;
}

export function HeroRibbonScene() {
  const [canRenderCanvas, setCanRenderCanvas] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const webglReady = typeof WebGLRenderingContext !== "undefined";
    setCanRenderCanvas(!reduceMotion && webglReady);
  }, []);

  if (!canRenderCanvas) {
    return <FallbackVisual />;
  }

  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 34 }}>
      <color attach="background" args={["#1a1412"]} />
      <ambientLight intensity={1.4} />
      <directionalLight color="#f7d9b7" intensity={2.4} position={[3, 2, 4]} />
      <directionalLight color="#8a4a2b" intensity={1.8} position={[-2, -1, 2]} />
      <pointLight color="#fff2e4" intensity={8} position={[0, 1.2, 2.4]} />
      <RibbonMesh />
    </Canvas>
  );
}

