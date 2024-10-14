import React from 'react';
import AutoFixNormalOutlinedIcon from '@mui/icons-material/AutoFixNormalOutlined';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import './IssueButton.css';

interface IssueButtonProps {
  variant?: 'fix' | 'ignore';
  onClick: (e: React.MouseEvent) => void;
}

const IssueButton: React.FC<IssueButtonProps> = ({ variant = 'fix', onClick }) => {
  const buttonClass = variant === 'fix' ? 'issueButtonFix' : 'issueButtonDelete';
  const ButtonIcon = variant === 'fix' ? AutoFixNormalOutlinedIcon : DeleteOutlineRoundedIcon;
  const buttonText = variant === 'fix' ? 'Fix' : 'Ignore';

  return (
    <div className={buttonClass} onClick={onClick}>
      <ButtonIcon style={{ width: '20px', height: '20px' }} />
      {buttonText}
    </div>
  );
};

export default IssueButton;
