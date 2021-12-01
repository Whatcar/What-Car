import { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import styled from 'styled-components';

const DescButton = ({ item, desc }) => {
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
    <Tooltip
      PopperProps={{
        disablePortal: true,
      }}
      onClose={handleTooltipClose}
      open={open}
      disableFocusListener
      disableTouchListener
      title={desc ? desc : 'no'}
    >
      <button onClick={handleTooltipOpen} style={{ width: '16px', justifySelf: 'flex-end' }}>
        <QuestionMarkIcon fontSize={'0.75rem'} />
      </button>
    </Tooltip>
  );
};

export default DescButton;

const IconBox = styled.div`
  width: 1rem;
  height: 1rem;
  border-radius: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.blueM};
`;
