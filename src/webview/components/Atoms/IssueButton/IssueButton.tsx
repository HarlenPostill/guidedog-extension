import React from 'react';
import AutoFixNormalOutlinedIcon from '@mui/icons-material/AutoFixNormalOutlined';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import './IssueButton.css';

const IssueButton = ({ variant = 'fix' }) => {
  const handleFixClick = (e: React.MouseEvent) => {
    console.log('Fix clicked');
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    console.log('Delete clicked');
  };

  const buttonClass = variant === 'fix' ? 'issueButtonFix' : 'issueButtonDelete';
  const ButtonIcon = variant === 'fix' ? AutoFixNormalOutlinedIcon : DeleteOutlineRoundedIcon;
  const buttonText = variant === 'fix' ? 'Fix' : 'Ignore';
  const onClickHandler = variant === 'fix' ? handleFixClick : handleDeleteClick;

  return (
    <div className={buttonClass} onClick={onClickHandler}>
      <ButtonIcon style={{ width: '20px', height: '20px' }} />
      {buttonText}
    </div>
  );
};

export default IssueButton;
