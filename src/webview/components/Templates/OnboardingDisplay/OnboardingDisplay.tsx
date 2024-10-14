import React, { useState, useEffect } from 'react';
import './OnboardingDisplay.css';
import WaterLevelPawPrint from '../../Molecules/WaterLevelPawPrint/WaterLevelPawPrint';
import { useDictionary } from '../../../hooks/useDictionary';

const OnboardingDisplay = (vscode : any) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const d = useDictionary();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, 50);

    return () => clearTimeout(timer); 
  }, []);

  return (
    <div className="onboarding-container">
      <div className={`paw ${isAnimating ? 'animate' : ''}`}>
        <WaterLevelPawPrint value1={2} value2={1} value3={1} speed={500} />
      </div>
        <h1 style={{ width: '100%', textAlign: 'center', color: '#CCC' }}>{d('ui.boxes.guideOnboarding.title')}

        </h1>
        <p style={{ width: '100%', textAlign: 'center', color: '#CCC' }}>{d('ui.boxes.guideOnboarding.subtitle')}
          
        </p>
    </div>
  );
};

export default OnboardingDisplay;