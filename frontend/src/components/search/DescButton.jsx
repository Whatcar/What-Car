import { useState, Fragment } from 'react';
import styled from 'styled-components';
import { ReactComponent as QuestionIcon } from '../../img/search/desc.svg';
import { colors } from '../../css/theme';
import MyTooltip from '../../css/MyTooltip';
import ClickAwayListener from '@mui/base/ClickAwayListener';

const DescButton = ({ idx, item, description, checked }) => {
  const [open, setOpen] = useState(false);

  const place = (idx) => {
    if (idx === undefined) return 'bottom-end';
    if (idx % 3 === 0) return 'top-start';
    if (idx % 3 === 1) return 'top';
    if (idx % 3 === 2) return 'top-end';
  };

  const handleTooltipClose = (e) => {
    e.stopPropagation();
    setOpen(false);
  };

  const handleTooltipOpen = (e) => {
    e.stopPropagation();
    setOpen((curr) => !curr);
  };

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <MyTooltip
        PopperProps={{
          disablePortal: true,
        }}
        onClose={handleTooltipClose}
        open={open}
        placement={place(idx)}
        disableFocusListener
        disableTouchListener
        title={
          <Fragment>
            <TooltipContent description={description} />
          </Fragment>
        }
      >
        <Label htmlFor={`${item}-desc`} onClick={(e) => e.stopPropagation()}>
          <QuestionIcon fill={checked ? colors.blueM : colors.black500} />
          <input
            style={{ display: 'none' }}
            id={`${item}-desc`}
            type="checkbox"
            onClick={handleTooltipOpen}
          />
        </Label>
      </MyTooltip>
    </ClickAwayListener>
  );
};

export default DescButton;

const Label = styled.label`
  justify-self: flex-end;
  box-sizing: border-box;
  padding-bottom: 3px;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TooltipContent = ({ description }) => {
  console.log(description);
  const desc = description.desc;
  const good = description.good;
  const bad = description.bad;

  return (
    <TextBox>
      <p>{desc && desc}</p>
      {good && <p>장점 : {good}</p>}
      {bad && <p>단점 : {bad}</p>}
    </TextBox>
  );
};

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  text-align: start;
`;
