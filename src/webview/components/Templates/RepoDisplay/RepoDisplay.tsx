import React from 'react';
import WaterLevelPawPrint from '../../Molecules/WaterLevelPawPrint/WaterLevelPawPrint';

const RepoDisplay = (vscode: any) => {
  return (
    <div>
      Repo
      <WaterLevelPawPrint value1={10} value2={10} value3={5} />
    </div>
  );
};

export default RepoDisplay;
