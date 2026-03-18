import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sparkles, Stars } from "@react-three/drei";
import * as THREE from "three";

const StarField = () => {
  const starGroup = useRef(null);

  const galaxy = useMemo(() => {
    const count = 4500;
    const arms = 5;
    const radius = 26;
    const randomness = 0.65;

    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const innerColor = new THREE.Color("#c7d2ff");
    const outerColor = new THREE.Color("#79e0ff");

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const armAngle = ((i % arms) / arms) * Math.PI * 2;
      const dist = Math.pow(Math.random(), 0.6) * radius;
      const spin = dist * 0.28;
      const angle = armAngle + spin;

      const randomX = (Math.random() - 0.5) * randomness * (radius - dist) * 0.7;
      const randomY = (Math.random() - 0.5) * randomness * 0.8;
      const randomZ = (Math.random() - 0.5) * randomness * (radius - dist) * 0.7;

      positions[i3] = Math.cos(angle) * dist + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(angle) * dist + randomZ - 20;

      const mixed = innerColor.clone().lerp(outerColor, dist / radius);
      colors[i3] = mixed.r;
      colors[i3 + 1] = mixed.g;
      colors[i3 + 2] = mixed.b;
    }

    return { positions, colors, count };
  }, []);

  useFrame((state, delta) => {
    if (!starGroup.current) return;

    // Keep motion subtle so the room remains the focus.
    starGroup.current.rotation.y += delta * 0.012;
    starGroup.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.06) * 0.02;
  });

  return (
    <group ref={starGroup} position={[0, 0, -18]}>
      <Stars
        radius={150}
        depth={95}
        count={9500}
        factor={4.6}
        saturation={0}
        fade
        speed={0.45}
      />

      <Stars
        radius={95}
        depth={45}
        count={2800}
        factor={2.4}
        saturation={0}
        fade
        speed={0.9}
      />

      <points rotation={[-0.24, 0.28, 0]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={galaxy.count}
            array={galaxy.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={galaxy.count}
            array={galaxy.colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          sizeAttenuation
          vertexColors
          transparent
          opacity={0.8}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <mesh position={[0, -0.5, -20]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3, 18, 96]} />
        <meshBasicMaterial
          color="#9fd7ff"
          transparent
          opacity={0.08}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <Sparkles
        count={180}
        scale={[38, 22, 24]}
        size={2.8}
        speed={0.28}
        opacity={0.5}
        color="#d3f4ff"
      />
    </group>
  );
};

export default StarField;
