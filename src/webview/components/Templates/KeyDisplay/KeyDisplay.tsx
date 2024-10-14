import React, { useState } from 'react';
import { useDictionary } from '../../../hooks/useDictionary';
import './KeyDisplay.css';

const KeyDisplay = (vscode: any) => {
    const d = useDictionary();
    const [key, setKey] = useState('');
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
        }
    };

    return (
        <div className="onboarding-container">
            <h1 className="title">{d('ui.boxes.keyDisplay.title')}</h1>
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
            {isValid === true && (
                <div className="success-message">{d('ui.boxes.keyDisplay.keyStatus.valid')}</div>
            )}
        </div>
    );
};

export default KeyDisplay;