import React, { useState, useRef, useEffect } from 'react';
import Icon from '../Icon/Icon';
import './ToolTip.css';

interface ToolTipProps {
  text: string;
}

const ToolTip = ({ text }: ToolTipProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState<'right' | 'left'>('right');
  const [maxWidth, setMaxWidth] = useState(200);
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isHovered && containerRef.current && tooltipRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const rightSpace = window.innerWidth - containerRect.right;

      if (rightSpace < 200) {
        setMaxWidth(Math.max(100, rightSpace - 20));
        if (rightSpace < 110) {
          setPosition('left');
          const leftSpace = containerRect.left;
          setMaxWidth(Math.min(200, Math.max(100, leftSpace - 20)));
        } else {
          setPosition('right');
        }
      } else {
        setPosition('right');
        setMaxWidth(200);
      }
    }
  }, [isHovered]);

  return (
    <div
      ref={containerRef}
      className="tooltip-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <Icon name={'InfoIcon'} />
      {isHovered && (
        <div
          ref={tooltipRef}
          className={`tooltip tooltip-${position}`}
          style={{ maxWidth: `${maxWidth}px` }}>
          {text}
        </div>
      )}
    </div>
  );
};

export default ToolTip;