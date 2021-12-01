import { useState } from 'react';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import styled from 'styled-components';

const DescButton = ({ desc }) => {
  const [open, setOpen] = useState(false);

  const handleTooltipClose = (e) => {
    e.stopPropagation();
    setOpen(false);
  };

  const handleTooltipOpen = (e) => {
    e.stopPropagation();
    setOpen((curr) => !curr);
  };

  return (
    <Button onClick={handleTooltipOpen}>
      <QuestionMarkIcon fontSize={'0.5rem'} />
    </Button>
  );
};

export default DescButton;

const IconBox = styled.div`
  width: 1rem;
  height: 1rem;
  border-radius: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.blueM};
`;
