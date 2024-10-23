import React from 'react';
import WaterLevelPawPrint from '../../Molecules/WaterLevelPawPrint/WaterLevelPawPrint';
import Link from '../../Atoms/Link/Link';
import './ViolationsOverview.css';
import ViolationSeverity from '../../Atoms/ViolationSeverity/ViolationSeverity';
import { useDictionary } from '../../../hooks/useDictionary';
import ToolTip from '../../Atoms/ToolTip/ToolTip';

interface ViolationsOverviewProps {
  A: number;
  AA: number;
  AAA: number;
  onSeeAllClick: () => void;
}

const ViolationsOverview = ({ A, AA, AAA, onSeeAllClick }: ViolationsOverviewProps) => {
  const d = useDictionary();

  return (
    <div className="violationsOverview">
      <div className="headerGroup">
        <div className="title">
          <div>{d('ui.boxes.guideLinesViolations.title')}</div>
          <ToolTip text={d('ui.toolTips.WCAG')} />
        </div>
        <Link name={d('ui.links.seeAll')} action={onSeeAllClick} />
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
