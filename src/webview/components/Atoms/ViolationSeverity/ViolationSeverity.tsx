import React from 'react';
import { useDictionary } from '../../../hooks/useDictionary';
import './ViolationSeverity.css';

interface ViolationSeverityProps {
  level: number;
  num: number;
}

const ViolationSeverity = ({ level, num }: ViolationSeverityProps) => {
  const d = useDictionary();
  const prefix = 'A'.repeat(Math.min(Math.max(level, 1), 3));
  const severityClass = `severity-${level}`;

  return (
    <div className={`violationText ${severityClass}`}>
      {prefix} : {num} {d('ui.boxes.guideLinesViolations.suffix')}
    </div>
  );
};

export default ViolationSeverity;
