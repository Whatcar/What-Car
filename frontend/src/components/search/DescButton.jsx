import { useState, Fragment } from 'react';
import styled from 'styled-components';
import { ReactComponent as QuestionIcon } from '../../img/search/desc.svg';
import { colors } from '../../css/theme';
import MyTooltip from '../../css/MyTooltip';

const DescButton = ({ idx, item, description, checked }) => {
  const [open, setOpen] = useState(false);

  const place = (idx) => {
    if (idx === undefined) return 'top-end';
    if (idx % 3 === 0) return 'bottom-start';
    if (idx % 3 === 1) return 'bottom';
    if (idx % 3 === 2) return 'bottom-end';
  };

  const handleTooltipOpen = (e) => {
    e.stopPropagation();
    setOpen((curr) => !curr);
  };

  return (
    <MyTooltip
      PopperProps={{
        disablePortal: true,
      }}
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
  const desc = description.desc;
  const good = description.good;
  const bad = description.bad;

  return (
    <TextBox>
      <p>{desc && desc}</p>
      {good && (
        <Box>
          <p>장점 : </p>
          <p>{good}</p>
        </Box>
      )}
      {bad && (
        <Box>
          <p>단점 : </p>
          <p>{bad}</p>
        </Box>
      )}
    </TextBox>
  );
};

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  text-align: start;
  color: ${({ theme }) => theme.colors.blueM};
`;

const Box = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  justify-content: flex-start;
`;
