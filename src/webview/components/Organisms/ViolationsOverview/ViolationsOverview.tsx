import React from 'react';
import WaterLevelPawPrint from '../../Molecules/WaterLevelPawPrint/WaterLevelPawPrint';
import Icon from '../../Atoms/Icon/Icon';
import Link from '../../Atoms/Link/Link';
import './ViolationsOverview.css';
import ViolationSeverity from '../../Atoms/ViolationSeverity/ViolationSeverity';
import { useDictionary } from '../../../hooks/useDictionary';

interface ViolationsOverview {
  A: number;
  AA: number;
  AAA: number;
}

const ViolationsOverview = ({ A, AA, AAA }: ViolationsOverview) => {
  const d = useDictionary();
  return (
    <div className="violationsOverview">
      <div className="headerGroup">
        <div className="title">
          <div>{d('ui.boxes.guideLinesViolations.title')}</div>
          <Icon name={'InfoIcon'} />
        </div>
        <Link
          name={'See All'}
          action={function (): void {
            throw new Error('Function not implemented.');
          }}
        />
      </div>
      <div className="graphValues">
        <WaterLevelPawPrint value1={A} value2={AA} value3={AAA} />
        <div className="violations">
          <ViolationSeverity level={1} num={A} />
          <ViolationSeverity level={2} num={AA} />
          <ViolationSeverity level={3} num={AAA} />
        </div>
      </div>
    </div>
  );
};

export default ViolationsOverview;
