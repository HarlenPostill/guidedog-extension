import React, { useMemo, useState } from 'react';
import Icon from '../../Atoms/Icon/Icon';
import { PieChart } from 'react-minimal-pie-chart';
import './ScoreBreakdown.css';
import { useDictionary } from '../../../hooks/useDictionary';

interface BreakdownProps {
  perc: number;
  oper: number;
  unde: number;
  robu: number;
  total: number;
}

const Breakdown = ({ perc, oper, unde, robu, total }: BreakdownProps) => {
  const totalPercentage = total > 0 ? Math.round(((unde + robu) / total) * 100) : 0;

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
            // paddingAngle={10} This is broken atm
            data={[
              { value: total > 0 ? (perc / total) * 100 : 0, color: '#fff568' },
              { value: total > 0 ? (oper / total) * 100 : 0, color: '#fda1a2' },
              { value: total > 0 ? (unde / total) * 100 : 0, color: '#ff9e68' },
              { value: total > 0 ? (robu / total) * 100 : 0, color: '#ff6d6d' },
            ]}
          />
          <div className="largeNum">
            <span className="letter-spacing">{totalPercentage}</span>
            <span className="sign">%</span>
            <div className="overall">{d('ui.boxes.breakdowns.total')}</div>
          </div>
        </div>
        <div className="scores">
          <div className="issueCatP">
            <Icon name="Paw" width={24} height={24} />
            <div className="descText">{d('ui.boxes.breakdowns.perceivable')}</div>
            <div className="percText">{total > 0 ? Math.round((perc / total) * 100) : 0}%</div>
          </div>
          <div className="issueCatO">
            <Icon name="Paw" width={24} height={24} />
            <div className="descText">{d('ui.boxes.breakdowns.operable')}</div>
            <div className="percText">{total > 0 ? Math.round((oper / total) * 100) : 0}%</div>
          </div>
          <div className="issueCatU">
            <Icon name="Paw" width={24} height={24} />
            <div className="descText">{d('ui.boxes.breakdowns.understandable')}</div>
            <div className="percText">{total > 0 ? Math.round((unde / total) * 100) : 0}%</div>
          </div>
          <div className="issueCatR">
            <Icon name="Paw" width={24} height={24} />
            <div className="descText">{d('ui.boxes.breakdowns.robust')}</div>
            <div className="percText">{total > 0 ? Math.round((robu / total) * 100) : 0}%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Breakdown;
