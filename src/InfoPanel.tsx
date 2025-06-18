import React from 'react';
import { PlanetData, sunData } from './planetData';

interface InfoPanelProps {
  selectedPlanet: PlanetData | null;
  showSun: boolean;
  onClose: () => void;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ selectedPlanet, showSun, onClose }) => {
  if (!selectedPlanet && !showSun) return null;

  const data = showSun ? sunData : selectedPlanet;
  if (!data) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      width: '300px',
      maxHeight: '80vh',
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      color: 'white',
      padding: '20px',
      borderRadius: '10px',
      border: '1px solid #333',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
      overflow: 'auto',
      zIndex: 1000,
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '15px'
      }}>
        <h2 style={{
          margin: 0,
          color: showSun ? sunData.color : selectedPlanet?.color,
          fontSize: '1.5em'
        }}>
          {data.name}
        </h2>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '1.5em',
            cursor: 'pointer',
            padding: '0',
            width: '30px',
            height: '30px'
          }}
        >
          ×
        </button>
      </div>
      
      <p style={{
        marginBottom: '15px',
        lineHeight: '1.4',
        fontSize: '0.9em'
      }}>
        {data.description}
      </p>
      
      <div style={{ marginBottom: '15px' }}>
        <h3 style={{
          margin: '0 0 10px 0',
          fontSize: '1.1em',
          color: '#4A9EFF'
        }}>
          Key Facts
        </h3>
        <ul style={{
          margin: 0,
          paddingLeft: '20px'
        }}>
          {data.facts.map((fact, index) => (
            <li key={index} style={{
              marginBottom: '5px',
              fontSize: '0.85em',
              lineHeight: '1.3'
            }}>
              {fact}
            </li>
          ))}
        </ul>
      </div>
      
      {!showSun && selectedPlanet && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '10px',
          fontSize: '0.8em'
        }}>
          <div>
            <strong>Distance from Sun:</strong><br />
            {(selectedPlanet.distance * 15).toFixed(0)} million km
          </div>
          <div>
            <strong>Orbital Period:</strong><br />
            {selectedPlanet.orbitalPeriod} days
          </div>
          <div>
            <strong>Rotation Period:</strong><br />
            {selectedPlanet.rotationPeriod} days
          </div>
          <div>
            <strong>Moons:</strong><br />
            {selectedPlanet.moons}
          </div>
          <div>
            <strong>Mass:</strong><br />
            {selectedPlanet.mass}
          </div>
          <div>
            <strong>Temperature:</strong><br />
            {selectedPlanet.temperature}
          </div>
        </div>
      )}
      
      {showSun && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '10px',
          fontSize: '0.8em'
        }}>
          <div>
            <strong>Mass:</strong><br />
            {sunData.mass}
          </div>
          <div>
            <strong>Surface Temperature:</strong><br />
            {sunData.temperature}
          </div>
          <div>
            <strong>Composition:</strong><br />
            73% Hydrogen, 25% Helium, 2% Other elements
          </div>
          <div>
            <strong>Age:</strong><br />
            ~4.6 billion years
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoPanel;