import { useEffect, useState } from 'react';
import styled from 'styled-components';
import getEmblem from '../../utils/getEmblem';
import { getSessionItem, setCheckedValues } from '../../utils/searchCondition';
import isChecked from '../../utils/isChecked';
import { desc } from '../../css/fonts';

const EmblemBox = ({ range, keyName }) => {
  const nowValues = getSessionItem(keyName, '').split(',');
  const [values, setValues] = useState(nowValues);

  useEffect(() => {
    sessionStorage.setItem(keyName, values);
  }, [range, keyName, values]);

  const emblemList = getEmblem(range).map((emblem) => {
    const name = emblem[0];
    const adress = emblem[1];

    const handleClick = (e) => {
      const newValue = e.target.value;
      const newValues = setCheckedValues(newValue, keyName);
      setValues(newValues);
    };

    return (
      <Emblem key={`${range}-${name}-box`} checked={isChecked(name, values)}>
        <Img key={`${range}-${name}-img`} art={name} src={adress} />
        <Name key={`${range}-${name}-name`}>{name}</Name>
        <input
          key={`${range}-${name}-input`}
          type="checkbox"
          value={name}
          onClick={handleClick}
        ></input>
      </Emblem>
    );
  });

  return <Box>{emblemList}</Box>;
};

const Box = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  height: 252px;
  overflow: auto;
  padding: 4px;
  padding-right: 12px;
  column-gap: 4px;
  row-gap: 4px;
  justify-content: center;
  align-content: start;
`;

const Emblem = styled.label`
  /* justify-self: center; */
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-width: 48px;
  height: 60px;
  box-shadow: ${(props) =>
    props.checked ? `${props.theme.colors.blueL} 0 0 0 1px inset` : 'none'};
  cursor: pointer;
  > input {
    display: none;
  }
`;

const Img = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
`;

const Name = styled.p`
  ${desc}
  text-align: center;
`;

export default EmblemBox;
