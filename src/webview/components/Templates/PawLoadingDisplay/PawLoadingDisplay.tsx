import React from 'react';
import './PawLoadingDisplay.css';

interface PawLoadingDisplayProps {
    loadingComplete: () => void;
}

const PawLoadingDisplay = ({ loadingComplete }: PawLoadingDisplayProps) => {
    React.useEffect(() => {

        const timer = setTimeout(() => {
            loadingComplete();
        }, 3000);

        return () => clearTimeout(timer);
    }, [loadingComplete]);

    return (
        <div className="paw-loading-display">
            <div className="paw-logo">Loading...</div>
        </div>
    );
};

export default PawLoadingDisplay;