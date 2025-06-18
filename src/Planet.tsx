import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Ring, Text } from '@react-three/drei';
import * as THREE from 'three';
import { PlanetData } from './planetData';

interface PlanetProps {
  planet: PlanetData;
  onPlanetClick: (planet: PlanetData) => void;
  showLabels: boolean;
  animationSpeed: number;
}

const Planet: React.FC<PlanetProps> = ({ planet, onPlanetClick, showLabels, animationSpeed }) => {
  const planetRef = useRef<THREE.Mesh>(null);
  const orbitRef = useRef<THREE.Group>(null);
  
  // Animation state
  useFrame((state) => {
    if (orbitRef.current && planetRef.current) {
      // Orbital motion
      const time = state.clock.getElapsedTime() * animationSpeed;
      const angle = (time / planet.orbitalPeriod) * 0.1; // Slow down orbital speed
      
      orbitRef.current.rotation.y = angle;
      
      // Planet rotation
      planetRef.current.rotation.y = (time / planet.rotationPeriod) * 2;
    }
  });

  return (
    <group>
      {/* Orbit ring */}
      <Ring
        args={[planet.distance - 0.05, planet.distance + 0.05, 64]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <meshBasicMaterial color="#333333" opacity={0.3} transparent />
      </Ring>
      
      {/* Planet group for orbital motion */}
      <group ref={orbitRef}>
        <group position={[planet.distance, 0, 0]}>
          {/* Planet sphere */}
          <Sphere
            ref={planetRef}
            args={[planet.radius, 32, 32]}
            onClick={() => onPlanetClick(planet)}
            onPointerOver={(e) => {
              e.stopPropagation();
              document.body.style.cursor = 'pointer';
            }}
            onPointerOut={(e) => {
              e.stopPropagation();
              document.body.style.cursor = 'auto';
            }}
          >
            <meshLambertMaterial
              color={planet.color}
            />
          </Sphere>
          
          {/* Saturn's rings */}
          {planet.name === 'Saturn' && (
            <>
              <Ring
                args={[planet.radius * 1.2, planet.radius * 2, 32]}
                rotation={[-Math.PI / 2, 0, 0]}
              >
                <meshBasicMaterial
                  color="#D4AF37"
                  opacity={0.6}
                  transparent
                  side={THREE.DoubleSide}
                />
              </Ring>
              <Ring
                args={[planet.radius * 2.1, planet.radius * 2.4, 32]}
                rotation={[-Math.PI / 2, 0, 0]}
              >
                <meshBasicMaterial
                  color="#D4AF37"
                  opacity={0.4}
                  transparent
                  side={THREE.DoubleSide}
                />
              </Ring>
            </>
          )}
          
          {/* Uranus's rings */}
          {planet.name === 'Uranus' && (
            <Ring
              args={[planet.radius * 1.5, planet.radius * 1.8, 32]}
              rotation={[0, 0, Math.PI / 3]} // Tilted rings
            >
              <meshBasicMaterial
                color="#4FD0E7"
                opacity={0.3}
                transparent
                side={THREE.DoubleSide}
              />
            </Ring>
          )}
          
          {/* Planet label */}
          {showLabels && (
            <Text
              position={[0, planet.radius + 1, 0]}
              fontSize={0.8}
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              {planet.name}
            </Text>
          )}
        </group>
      </group>
    </group>
  );
};

export default Planet;