import React, { useEffect, useState } from 'react';
import { useDictionary } from '../../../hooks/useDictionary';
import './KeyDisplay.css';

interface KeyDisplayProps {
    vscode: any;
    keyDisplayComplete: (isValid: boolean) => void; 
}

const KeyDisplay = ({ vscode, keyDisplayComplete }: KeyDisplayProps) => {
    const d = useDictionary();
    const [key, setKey] = useState('');
    const [isAnimating, setIsAnimating] = useState(false);
    const [isValid, setIsValid] = useState<boolean | null>(null); 

    const expectedKey = '1111'; 

    const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKey(e.target.value);
        setIsValid(null);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    const handleSubmit = () => {
        const isValidKey = key === expectedKey;
        setIsValid(isValidKey);
        if (isValidKey) {
            vscode.postMessage({ command: 'saveKey', key });
            keyDisplayComplete(true); 
        } else {
            keyDisplayComplete(false); 
        }
    };

    useEffect(() => {
        setIsAnimating(true);
        const timer = setTimeout(() => {
            setIsAnimating(false); 
        }, 3000);

        return () => clearTimeout(timer); 
    }, []);

    return (
        <div className="onboarding-container">
            <h1 className={`key ${isAnimating ? 'animate' : ''}`}>
                <span className="title" style={{ marginBottom: '20px' }}>
                    {d('ui.boxes.keyDisplay.title')}
                </span>
            </h1>
            <input
                type="text"
                border-color={isValid === false ? 'red' : 'black'}
                border-radius="5px"
                placeholder={d('ui.boxes.keyDisplay.input')}
                value={key}
                onChange={handleKeyChange}
                onKeyUp={handleKeyPress}
                className="placeholder"
            />
            {isValid === false && (
                <div className="error-message">{d('ui.boxes.keyDisplay.keyStatus.error')}</div>
            )}
        </div>
    );
};

export default KeyDisplay;