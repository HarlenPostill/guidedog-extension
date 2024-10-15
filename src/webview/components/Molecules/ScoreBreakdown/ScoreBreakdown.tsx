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
  const totalPercentage = Math.round((perc + oper + unde + robu) / 4);
  const d = useDictionary();
  return (
    <div className="breakdownContainer">
      <div className="headerGroup">
        <div className="title">{d('ui.boxes.breakdowns.title')}</div>
      </div>
      <div className="breakdownWrapper">
        <div className="chart">
          <PieChart
            lineWidth={14}
            paddingAngle={10}
            data={[
              { value: perc, color: '#fff568' },
              { value: oper, color: '#fda1a2' },
              { value: unde, color: '#ff9e68' },
              { value: robu, color: '#ff6d6d' },
            ]}
          />
          <div className="largeNum">
            {totalPercentage}
            <span className="sign">%</span>
            <div className="overall">{d('ui.boxes.breakdowns.total')}</div>
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
    </div>
  );
};

export default Breakdown;
