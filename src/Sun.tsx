import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Text } from '@react-three/drei';
import * as THREE from 'three';
import { sunData } from './planetData';

interface SunProps {
  onSunClick: () => void;
  showLabels: boolean;
  animationSpeed: number;
}

const Sun: React.FC<SunProps> = ({ onSunClick, showLabels, animationSpeed }) => {
  const sunRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (sunRef.current) {
      // Sun rotation
      sunRef.current.rotation.y += 0.005 * animationSpeed;
      
      // Pulsing effect
      const scale = 1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.05;
      sunRef.current.scale.setScalar(scale);
      
      if (glowRef.current) {
        glowRef.current.scale.setScalar(scale * 1.1);
      }
    }
  });

  return (
    <group>
      {/* Sun glow effect - render first */}
      <Sphere ref={glowRef} args={[sunData.radius * 1.2, 32, 32]} position={[0, 0, 0]}>
        <meshBasicMaterial
          color="#FFA500"
          transparent
          opacity={0.1}
        />
      </Sphere>
      
      {/* Main Sun */}
      <Sphere
        ref={sunRef}
        args={[sunData.radius, 32, 32]}
        position={[0, 0, 0]}
        onClick={onSunClick}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'auto';
        }}
      >
        <meshBasicMaterial
          color={sunData.color}
        />
      </Sphere>
      
      {/* Sun label */}
      {showLabels && (
        <Text
          position={[0, sunData.radius + 2, 0]}
          fontSize={1}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {sunData.name}
        </Text>
      )}
    </group>
  );
};

export default Sun;