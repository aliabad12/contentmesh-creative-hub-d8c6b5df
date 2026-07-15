import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, ContactShadows, Float } from "@react-three/drei";
import blobAsset from "@/assets/blob.gltf.asset.json";
import type { Group } from "three";

useGLTF.preload(blobAsset.url);

function Blob() {
  const ref = useRef<Group>(null);
  const { scene } = useGLTF(blobAsset.url);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y = t * 0.35;
      ref.current.rotation.x = Math.sin(t * 0.25) * 0.15;
      const s = 1 + Math.sin(t * 0.9) * 0.04;
      ref.current.scale.set(s, s, s);
    }
  });

  return (
    <group ref={ref}>
      <primitive object={scene} />
    </group>
  );
}

export function BlobModel() {
  return (
    <div className="relative aspect-square w-full max-w-[560px] mx-auto">
      {/* Soft radial glow behind the blob */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 50%, rgba(255,180,140,0.45) 0%, rgba(255,120,60,0.18) 30%, rgba(255,255,255,0) 70%)",
          filter: "blur(20px)",
        }}
      />
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 40 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 6, 5]} intensity={1.2} castShadow />
        <directionalLight position={[-4, -2, -3]} intensity={0.35} color="#ffd7c2" />
        <Suspense fallback={null}>
          <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.9} floatingRange={[-0.15, 0.15]}>
            <Blob />
          </Float>
          <ContactShadows
            position={[0, -1.35, 0]}
            opacity={0.28}
            scale={6}
            blur={2.8}
            far={3}
            color="#8a5a3a"
          />
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
}
