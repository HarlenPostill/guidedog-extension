import React, { useEffect, useState } from 'react';
import { useDictionary } from '../../../hooks/useDictionary';
import './IntroductionDisplay.css';
import Divider from '../../Atoms/Divider/Divider';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import Button from '../../Atoms/Button/Button';

interface IntroductionDisplayProps {
    introductionComplete() : void;
}

const IntroductionDisplay = ({ introductionComplete }: IntroductionDisplayProps) => {
    const d = useDictionary();
    const [isAnimating, setIsAnimating] = useState(false);
    
    useEffect(() => {
        setIsAnimating(true);
        const timer = setTimeout(() => {
            setIsAnimating(false); 
        }, 3000);

        return () => clearTimeout(timer); 
    }, []);
    
    const handleClickGit = () => {
        introductionComplete();
    }

    return (
        <div className="introduction-container">
            <div className="introduction-content">
                <h1>
                    <span>{d('ui.boxes.guideOnboarding.titlePart1')}</span>
                    <span>{d('ui.boxes.guideOnboarding.titlePart2')}</span>
                </h1>
                <div className="subtext-introduction">
                    <p className="subtext-introduction pink">
                        {d('ui.boxes.guideOnboarding.text')}
                    </p>
                    <Divider/>
                    <ul className="feature-list">
                        <li>
                            <AutoAwesomeIcon fontSize="small" />
                            {d('ui.boxes.guideOnboarding.features.list1')}
                        </li>
                        <li>
                            <AutoAwesomeIcon fontSize="small" />
                            {d('ui.boxes.guideOnboarding.features.list2')}
                        </li>
                        <li>
                            <AutoAwesomeIcon fontSize="small" />
                            {d('ui.boxes.guideOnboarding.features.list3')}
                        </li>
                        <li>
                            <AutoAwesomeIcon fontSize="small" style={{ color: "#FDA1A2" }}/>
                            {d('ui.boxes.guideOnboarding.features.list4')}
                        </li>
                    </ul>
                    <p className="subtext-introduction grey">
                        {d('ui.boxes.guideOnboarding.description')}
                    </p>
                </div>
            </div>
            <Button className="start-button" onClick={handleClickGit} text={d('ui.boxes.guideOnboarding.button')} />
        </div>
    );
};

export default IntroductionDisplay;