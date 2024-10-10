import React from 'react';
import Icon from '../../Atoms/Icon/Icon';
import { PieChart } from 'react-minimal-pie-chart';

import './ScoreBreakdown.css';
import { useDictionary } from '../../../hooks/useDictionary';

interface BreakdownProps {
  perc: number;
  oper: number;
  unde: number;
  robu: number;
}

const Breakdown = ({ perc, oper, unde, robu }: BreakdownProps) => {
  const d = useDictionary();

  const totalPercentage = (perc + oper + unde + robu) / 400;

  return (
    <div className="breakdownContainer">
      <div className="chart">
        <PieChart
          lineWidth={16}
          paddingAngle={18}
          data={[
            { value: 10, color: '#fff568' },
            { value: 15, color: '#fda1a2' },
            { value: 20, color: '#ff9e68' },
            { value: 20, color: '#ff6d6d' },
          ]}
        />
        <div className="scoreWrapper">
          <div className="scoreContainer">
            <div className="percentage">
              <div className="largeNum">{totalPercentage}</div>
              <div className="sign">%</div>
            </div>
            <div className="overall">{d('ui.boxes.breakdowns.total')}</div>
          </div>
        </div>
      </div>
      <div className="scores">
        <div className="issueCatP">
          <Icon name="Paw" width={24} height={24} />
          <div className="descText">{d('ui.boxes.breakdowns.perceivable')}</div>
          <div className="percText">{perc}%</div>
        </div>
        <div className="issueCatO">
          <Icon name="Paw" width={24} height={24} />
          <div className="descText">{d('ui.boxes.breakdowns.operable')}</div>
          <div className="percText">{oper}%</div>
        </div>
        <div className="issueCatU">
          <Icon name="Paw" width={24} height={24} />
          <div className="descText">{d('ui.boxes.breakdowns.understandable')}</div>
          <div className="percText">{unde}%</div>
        </div>
        <div className="issueCatR">
          <Icon name="Paw" width={24} height={24} />
          <div className="descText">{d('ui.boxes.breakdowns.robust')}</div>
          <div className="percText">{robu}%</div>
        </div>
      </div>
    </div>
  );
};

export default Breakdown;
