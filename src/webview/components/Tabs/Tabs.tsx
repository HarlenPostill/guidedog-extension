import React, { useState, useRef, useEffect } from 'react';
import './Tabs.css';

interface TabProps {
  headers: string[];
  children: React.ReactNode[];
}

const Tabs: React.FC<TabProps> = ({ headers, children }) => {
  const [activeTab, setActiveTab] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const underlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const activeTabElement = tabRefs.current[activeTab];
    const underlineElement = underlineRef.current;
    if (activeTabElement && underlineElement) {
      underlineElement.style.left = `${activeTabElement.offsetLeft}px`;
      underlineElement.style.width = `${activeTabElement.offsetWidth}px`;
    }
  }, [activeTab]);

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
