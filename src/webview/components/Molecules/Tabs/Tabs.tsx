import React, { useRef, useEffect, useCallback, useState, ReactNode } from 'react';
import './Tabs.css';

interface TabProps {
  headers: string[];
  children: ReactNode[];
  activeTab: number;
  setActiveTab: (index: number) => void;
}

const Tabs: React.FC<TabProps> = ({ headers, children, activeTab, setActiveTab }) => {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const underlineRef = useRef<HTMLDivElement>(null);
  const [underlineStyle, setUnderlineStyle] = useState({
    width: 0,
    transform: 'translateX(0px)',
    opacity: 0,
  });

  const updateUnderline = useCallback(() => {
    if (activeTab >= 0 && activeTab < headers.length) {
      const activeTabElement = tabRefs.current[activeTab];
      if (activeTabElement) {
        setUnderlineStyle({
          width: activeTabElement.offsetWidth,
          transform: `translateX(${activeTabElement.offsetLeft}px)`,
          opacity: 1,
        });
      }
    } else {
      setUnderlineStyle({ width: 0, transform: 'translateX(0px)', opacity: 0 });
    }
  }, [activeTab, headers.length]);

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

  const renderContent = () => {
    if (activeTab >= 0 && activeTab < children.length) {
      return children[activeTab];
    }
    // Render the "secret" tab content if activeTab is out of range
    return children[children.length - 1];
  };

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
      <div className="tab-content">{renderContent()}</div>
    </div>
  );
};

export default Tabs;
