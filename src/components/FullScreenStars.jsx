import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

const StarLayer = () => {
  const travelRef = useRef(null);
  const scrollProgress = useRef(0);
  const frameAccumulator = useRef(0);

  const starData = useMemo(() => {
    const count = 950;
    const rangeX = 140;
    const rangeY = 90;
    const nearZ = 20;
    const farZ = -180;

    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * rangeX;
      positions[i3 + 1] = (Math.random() - 0.5) * rangeY;
      positions[i3 + 2] = farZ + Math.random() * (nearZ - farZ);
      speeds[i] = 0.45 + Math.random() * 1.2;
    }

    return { positions, speeds, count, nearZ, farZ };
  }, []);

  useEffect(() => {
    const updateScrollProgress = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.current = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };

    updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
    };
  }, []);

  useFrame((state, delta) => {
    if (!travelRef.current) return;
    frameAccumulator.current += delta;
    if (frameAccumulator.current < 1 / 45) return;
    const frameDelta = frameAccumulator.current;
    frameAccumulator.current = 0;

    const progress = scrollProgress.current;
    const motionBoost = 1 + progress * 8;

    const attr = travelRef.current.geometry.attributes.position;
    const positions = attr.array;

    for (let i = 0; i < starData.count; i++) {
      const i3 = i * 3;
      positions[i3 + 2] += frameDelta * starData.speeds[i] * motionBoost;

      if (positions[i3 + 2] > starData.nearZ) {
        positions[i3 + 2] = starData.farZ;
      }
    }

    attr.needsUpdate = true;

    travelRef.current.rotation.y = state.clock.elapsedTime * 0.01 + progress * 0.3;
    travelRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.07) * 0.04;
  });

  return (
    <group position={[0, 0, -35]}>
      <Stars
        radius={180}
        depth={110}
        count={5200}
        factor={3.4}
        saturation={0}
        fade
        speed={0.4}
      />

      <points ref={travelRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={starData.count}
            array={starData.positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#d9ecff"
          size={0.075}
          transparent
          opacity={0.72}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    </group>
  );
};

const FullScreenStars = () => {
  return (
    <div className="full-screen-stars" aria-hidden="true">
      <Canvas
        dpr={[0.8, 1.2]}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 28], fov: 60 }}
      >
        <StarLayer />
      </Canvas>
    </div>
  );
};

export default FullScreenStars;
