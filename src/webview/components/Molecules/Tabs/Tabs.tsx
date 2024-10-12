import React, { useRef, useEffect, useCallback } from 'react';
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

  const updateUnderline = useCallback(() => {
    const activeTabElement = tabRefs.current[activeTab];
    const underlineElement = underlineRef.current;
    if (activeTabElement && underlineElement) {
      underlineElement.style.transform = `translateX(${activeTabElement.offsetLeft}px)`;
      underlineElement.style.width = `${activeTabElement.offsetWidth}px`;
    }
  }, [activeTab]);

  useEffect(() => {
    updateUnderline();
    let rafId: number;
    const handleResize = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateUnderline);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(rafId);
    };
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
        <div ref={underlineRef} className="tab-underline" />
      </div>
      <div className="tab-content">{children[activeTab]}</div>
    </div>
  );
};

export default Tabs;
