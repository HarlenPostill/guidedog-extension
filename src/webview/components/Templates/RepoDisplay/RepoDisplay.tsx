import React from 'react';
import WaterLevelPawPrint from '../../Molecules/WaterLevelPawPrint/WaterLevelPawPrint';
import ViolationsOverview from '../../Organisms/ViolationsOverview/ViolationsOverview';
import Divider from '../../Atoms/Divider/Divider';
import RepoIssuesList from '../../Organisms/RepoIssuesList/RepoIssuesList';

interface RepoDisplayProps {
  vscode: any;
  switchToSingleDisplay: () => void;
}

const RepoDisplay = ({ vscode, switchToSingleDisplay }: RepoDisplayProps) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <ViolationsOverview A={100} AA={50} AAA={100} />
      <Divider />
      <RepoIssuesList
        vscode={vscode}
        switchToSingleDisplay={switchToSingleDisplay}
        issuesData={[
          {
            fileName: 'src/pages/HomePage.tsx',
            issues: [
              {
                location: 13,
                impact: 'moderate',
                type: 'landmark-one-main',
                improvement: '<div className="main w-screen h-screen bg-poke-lemon-yellow">',
              },
            ],
          },
          {
            fileName: 'src/pages/PokemonPage.tsx',
            issues: [
              {
                location: 12,
                impact: 'moderate',
                type: 'page-has-heading-one',
                improvement: "<h1 className='text-4xl mr-4 font-bold'>Pokemon Details</h1>",
              },
              {
                location: 30,
                impact: 'moderate',
                type: 'region',
                improvement: "<main className='pt-24 flex flex-col justify-start items-center'>",
              },
            ],
          },
          {
            fileName: 'src/pages/PageNotFound.tsx',
            issues: [
              {
                location: 3,
                impact: 'moderate',
                type: 'landmark-one-main',
                improvement: "<main className='flex flex-col justify-center items-center pt-32'>",
              },
            ],
          },
          {
            fileName: 'src/components/NavBar.tsx',
            issues: [
              {
                location: 1,
                impact: 'moderate',
                type: 'region',
                improvement: "<nav className='w-full'>{/* Navbar items */}</nav>",
              },
            ],
          },
        ]}
      />
      <Divider />
    </div>
  );
};

export default RepoDisplay;
