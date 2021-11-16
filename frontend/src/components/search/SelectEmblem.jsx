import styled from 'styled-components';
import getEmblem from '../../utils/getEmblem';
import { desc } from '../../css/fonts';
import { blue } from '../../css/colors';
import { useEffect, useState } from 'react';
import setCheckedValues from '../../utils/setCheckedValues';
import isChecked from '../../utils/isChecked';

const EmblemBox = ({ range = '전체', setChecked }) => {
  const [values, setValues] = useState([]);

  useEffect(() => {
    setValues([]);
  }, [range]);

  useEffect(() => {
    setChecked(values);
  }, [values]);

  const emblem_list = getEmblem(range).map((emblem) => {
    const name = emblem[0];
    const adress = emblem[1];

    const handleClick = (e) => {
      const newValue = e.target.value;
      setCheckedValues(newValue, values, setValues);
    };

    return (
      <>
        <Emblem key={`${range}-${name}`} checked={isChecked(name, values)}>
          <Img art={name} src={adress} />
          <Name>{name}</Name>
          <input type="checkbox" value={name} onClick={handleClick}></input>
        </Emblem>
      </>
    );
  });

  return <Box>{emblem_list}</Box>;
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
  box-shadow: ${(props) => (props.checked ? `${blue.light} 0 0 0 1px inset` : 'none')};
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
