import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, PerspectiveCamera } from '@react-three/drei';
import Planet from './Planet';
import Sun from './Sun';
import InfoPanel from './InfoPanel';
import { planetsData, PlanetData } from './planetData';

interface BlockProps {
  title?: string;
  description?: string;
}

const Block: React.FC<BlockProps> = ({ title, description }) => {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);
  const [showSun, setShowSun] = useState(false);
  const [showLabels, setShowLabels] = useState(true);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Send completion event when the solar system loads
    const timer = setTimeout(() => {
      setIsLoaded(true);
      try {
        window.postMessage({ 
          type: 'BLOCK_COMPLETION', 
          blockId: 'solar-system-3d', 
          completed: true,
          data: { interactionType: 'loaded' }
        }, '*');
        window.parent.postMessage({ 
          type: 'BLOCK_COMPLETION', 
          blockId: 'solar-system-3d', 
          completed: true,
          data: { interactionType: 'loaded' }
        }, '*');
      } catch (error) {
        console.log('Completion event sent');
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handlePlanetClick = (planet: PlanetData) => {
    setSelectedPlanet(planet);
    setShowSun(false);
  };

  const handleSunClick = () => {
    setShowSun(true);
    setSelectedPlanet(null);
  };

  const handleCloseInfo = () => {
    setSelectedPlanet(null);
    setShowSun(false);
  };

  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      margin: 0, 
      padding: 0,
      background: 'linear-gradient(to bottom, #000011 0%, #000033 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        zIndex: 100,
        color: 'white',
        fontFamily: 'Arial, sans-serif'
      }}>
        <h1 style={{
          margin: '0 0 10px 0',
          fontSize: '2em',
          textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
        }}>
          {title || '3D Solar System'}
        </h1>
        <p style={{
          margin: 0,
          fontSize: '0.9em',
          opacity: 0.8
        }}>
          {description || 'Click on planets and the sun to learn more • Use mouse to navigate'}
        </p>
      </div>

      {/* Controls */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        zIndex: 100,
        color: 'white',
        fontFamily: 'Arial, sans-serif',
        background: 'rgba(0,0,0,0.7)',
        padding: '15px',
        borderRadius: '8px',
        border: '1px solid #333'
      }}>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={showLabels}
              onChange={(e) => setShowLabels(e.target.checked)}
              style={{ marginRight: '8px' }}
            />
            Show Labels
          </label>
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9em' }}>
            Animation Speed: {animationSpeed.toFixed(1)}x
          </label>
          <input
            type="range"
            min="0"
            max="5"
            step="0.1"
            value={animationSpeed}
            onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
            style={{ width: '150px' }}
          />
        </div>
      </div>

      {/* Instructions */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        right: selectedPlanet || showSun ? '340px' : '20px',
        zIndex: 100,
        color: 'white',
        fontFamily: 'Arial, sans-serif',
        background: 'rgba(0,0,0,0.7)',
        padding: '10px',
        borderRadius: '8px',
        border: '1px solid #333',
        fontSize: '0.8em',
        maxWidth: '200px',
        transition: 'right 0.3s ease'
      }}>
        <div><strong>Controls:</strong></div>
        <div>• Left click + drag: Rotate view</div>
        <div>• Right click + drag: Pan</div>
        <div>• Scroll: Zoom in/out</div>
        <div>• Click planets/sun: View info</div>
      </div>

      {/* 3D Scene */}
      <Canvas style={{ width: '100%', height: '100%' }}>
        <Suspense fallback={null}>
          {/* Camera */}
          <PerspectiveCamera
            makeDefault
            position={[0, 30, 80]}
            fov={50}
          />
          
          {/* Controls */}
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={10}
            maxDistance={200}
            autoRotate={false}
            autoRotateSpeed={0.5}
          />
          
          {/* Lighting */}
          <ambientLight intensity={0.1} />
          <pointLight position={[0, 0, 0]} intensity={2} distance={100} />
          <directionalLight position={[10, 10, 5]} intensity={0.5} />
          
          {/* Background stars */}
          <Stars
            radius={300}
            depth={60}
            count={5000}
            factor={7}
            saturation={0}
            fade={true}
          />
          
          {/* Sun */}
          <Sun
            onSunClick={handleSunClick}
            showLabels={showLabels}
            animationSpeed={animationSpeed}
          />
          
          {/* Planets */}
          {planetsData.map((planet) => (
            <Planet
              key={planet.name}
              planet={planet}
              onPlanetClick={handlePlanetClick}
              showLabels={showLabels}
              animationSpeed={animationSpeed}
            />
          ))}
        </Suspense>
      </Canvas>

      {/* Information Panel */}
      <InfoPanel
        selectedPlanet={selectedPlanet}
        showSun={showSun}
        onClose={handleCloseInfo}
      />

      {/* Loading indicator */}
      {!isLoaded && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          fontSize: '1.2em',
          zIndex: 1000
        }}>
          Loading Solar System...
        </div>
      )}
    </div>
  );
};

export default Block;