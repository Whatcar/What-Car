import { useEffect, useCallback } from 'react';
import styled from 'styled-components';
import getEmblem from '../../utils/getEmblem';
import { setCheckedValuesArray } from '../../utils/searchCondition';
import { desc } from '../../css/fonts';
import { AccordionDetails } from '@mui/material';
import { useRecoilState } from 'recoil';
import * as atom from '../../recoil/atom';
import MyAccordion, { MyAccordionSummary } from '../../css/MyAccordion';
import { categoryDesc } from '../../data/description';

const SelectEmblem = () => {
  const [range, setRange] = useRecoilState(atom.range);
  const [values, setValues] = useRecoilState(atom.brand);

  const isDisabled = (label) => {
    return range === label;
  };

  const handleClickRange = useCallback((e) => {
    const newRange = e.target.innerText;
    setRange(newRange);
  }, []);

  const emblemList = getEmblem(range).map((emblem) => {
    const name = emblem[0];
    const adress = emblem[1];

    const handleClick = (e) => {
      const newValue = e.target.value;
      const newValues = setCheckedValuesArray(newValue, values);
      setValues(newValues);
    };

    return (
      <Emblem key={`${range}-${name}-box`} checked={values.includes(name)}>
        <Img art={name} src={adress} />
        <Name>{name}</Name>
        <input type="checkbox" value={name} onClick={handleClick}></input>
      </Emblem>
    );
  });

  return (
    <BrandBox>
      <MyAccordion defaultExpanded>
        <MyAccordionSummary aria-controls="panel1a-content" id="panel1a-header">
          <span>{categoryDesc.brand.title}</span>
          <span>{categoryDesc.brand.comment}</span>
        </MyAccordionSummary>
        <AccordionDetails>
          <RangeButtons>
            <RangeButton disabled={isDisabled('전체')} onClick={handleClickRange}>
              전체
            </RangeButton>
            <RangeButton disabled={isDisabled('국산')} onClick={handleClickRange}>
              국산
            </RangeButton>
            <RangeButton disabled={isDisabled('수입')} onClick={handleClickRange}>
              수입
            </RangeButton>
          </RangeButtons>
          <EmblemBox>{emblemList}</EmblemBox>
        </AccordionDetails>
      </MyAccordion>
    </BrandBox>
  );
};

const EmblemBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-height: 12rem;
  overflow: auto;
  padding: 0.5rem;
  padding-left: 0;
  column-gap: 4px;
  row-gap: 4px;
  justify-content: start;
  align-content: start;
`;

const Emblem = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 4.5rem;
  height: 4rem;
  box-shadow: ${(props) =>
    props.checked ? `${props.theme.colors.blueL} 0 0 0 1px inset` : 'none'};
  color: ${(props) => (props.checked ? props.theme.colors.blueM : props.theme.colors.black900)};
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

const RangeButtons = styled.div`
  display: flex;
`;

const RangeButton = styled.button`
  background-color: white;
  border: none;
  ${({ theme }) => theme.fontStyle.desc}
  color: ${(props) => (props.disabled ? props.theme.colors.blueM : '')};
`;

const BrandBox = styled.div`
  grid-column: 1 / 3;
`;

export default SelectEmblem;
