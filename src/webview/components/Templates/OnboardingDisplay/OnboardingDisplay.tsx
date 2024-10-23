import React, { useState, useEffect } from 'react';
import './OnboardingDisplay.css';
import WaterLevelPawPrint from '../../Molecules/WaterLevelPawPrint/WaterLevelPawPrint';
import { useDictionary } from '../../../hooks/useDictionary';

interface OnboardingDisplayProps {
  onboardingComplete: () => void;
}

const OnboardingDisplay = ({ onboardingComplete }: OnboardingDisplayProps)  => {
  const [isAnimating, setIsAnimating] = useState(false);
  const d = useDictionary();

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => {
      onboardingComplete();
    }, 3000); 

    return () => clearTimeout(timer); 
  }, [onboardingComplete]);

  return (
    <div className="onboarding-container">
      <div className={`paw ${isAnimating ? 'animate' : ''}`}>
        <WaterLevelPawPrint value1={2} value2={1} value3={1} speed={500} />
      </div>
      <h1 className={`onboarding-text ${isAnimating ? 'animate' : ''}`}>
        <span className="title-part1">{d('ui.boxes.guideOnboarding.titlePart1')}</span>
        <span className="title-part2">{d('ui.boxes.guideOnboarding.titlePart2')}</span>
      </h1>
      <p className={`onboarding-subtext ${isAnimating ? 'animate' : ''}`}>
        {d('ui.boxes.guideOnboarding.subtitle')}
      </p>
    </div>
  );
};

export default OnboardingDisplay;