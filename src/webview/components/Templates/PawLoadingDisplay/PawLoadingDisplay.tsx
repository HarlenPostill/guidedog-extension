import React, { useState, useEffect } from 'react';
import './PawLoadingDisplay.css';
import WaterLevelPawPrint from '../../Molecules/WaterLevelPawPrint/WaterLevelPawPrint';
import { useDictionary } from '../../../hooks/useDictionary';

interface PawLoadingDisplayProps {
    loadingComplete: () => void;
}

const PawLoadingDisplay = ({ loadingComplete }: PawLoadingDisplayProps) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const d = useDictionary();

    useEffect(() => {
        setIsAnimating(true);
        const timer = setTimeout(() => {
            loadingComplete();
        }, 10000); 
    
        return () => clearTimeout(timer); 
        }, [loadingComplete]);
    

    return (
        <div className="loading-container">
            <div className={`paw-loading ${isAnimating ? 'animate' : ''}`}>
                <WaterLevelPawPrint value1={2} value2={1} value3={1} speed={500} />
            </div>
            <h1 className="title-loading">Introducing GuideDog</h1>
            <p className="title-loading">
                Your personal AI Accessibility Assistant
            </p>
        </div>
    );
};

export default PawLoadingDisplay;