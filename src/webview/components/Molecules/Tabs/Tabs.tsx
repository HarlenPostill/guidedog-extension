import React, { useRef, useEffect, useCallback, useState } from 'react';
import './Tabs.css';

interface TabProps {
  headers: string[];
  children: React.ReactNode[];
  activeTab: number;
  setActiveTab: (index: number) => void;
}

const Tabs = ({ headers, children, activeTab, setActiveTab }: TabProps) => {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const underlineRef = useRef<HTMLDivElement>(null);
  const [underlineStyle, setUnderlineStyle] = useState({
    width: 0,
    transform: 'translateX(0px)',
    opacity: 0,
  });

  const updateUnderline = useCallback(() => {
    const activeTabElement = tabRefs.current[activeTab];
    if (activeTabElement) {
      setUnderlineStyle({
        width: activeTabElement.offsetWidth,
        transform: `translateX(${activeTabElement.offsetLeft}px)`,
        opacity: 1,
      });
    }
  }, [activeTab]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      updateUnderline();
    });

    tabRefs.current.forEach(tabRef => {
      if (tabRef) {
        resizeObserver.observe(tabRef);
      }
    });

    return () => {
      resizeObserver.disconnect();
    };
  }, [updateUnderline]);

  useEffect(() => {
    updateUnderline();
  }, [updateUnderline]);

  return (
    <div className="tab-container">
      <div className="tab-header">
        {headers.map((header, index) => (
          <button
            key={index}
            ref={el => (tabRefs.current[index] = el)}
            className={`tab-button ${activeTab === index ? 'active' : ''}`}
            onClick={() => setActiveTab(index)}>
            {header}
          </button>
        ))}
        <div ref={underlineRef} className="tab-underline" style={underlineStyle} />
      </div>
      <div className="tab-content">{children[activeTab]}</div>
    </div>
  );
};

export default Tabs;
