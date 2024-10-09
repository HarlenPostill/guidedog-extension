import React from 'react';
import WaterLevelPawPrint from '../../Molecules/WaterLevelPawPrint/WaterLevelPawPrint';
import ViolationsOverview from '../../Organisms/ViolationsOverview/ViolationsOverview';
import Divider from '../../Atoms/Divider/Divider';

const RepoDisplay = (vscode: any) => {
  return (
    <div>
      <ViolationsOverview A={100} AA={100} AAA={100} />
      <Divider />
    </div>
  );
};

export default RepoDisplay;
