import Grid from '@mui/material/Grid';
import { useCallback, useEffect, useState } from 'react';
import SelectEmblem from './SelectEmblem';
import styled from 'styled-components';
import SelectCheck from './SelectCheck';
import { TextField, ThemeProvider } from '@mui/material';
import SelectOne from './SelectOne';
import SelectTwo from './SelectTwo';
import { selectTheme } from '../../css/muiTheme';
import { getSessionItem } from '../../utils/searchCondition';

const SelectBox = () => {
  const nowRange = getSessionItem('range', '전체');
  const nowName = getSessionItem('name', '');
  const [range, setRange] = useState(nowRange);
  const [name, setName] = useState(nowName);

  const isDisabled = (label) => {
    return range === label;
  };

  useEffect(() => {
    sessionStorage.setItem('name', nowName);
  }, []);

  const handleClickRange = useCallback((e) => {
    const newRange = e.target.innerText;
    sessionStorage.setItem('range', newRange);
    sessionStorage.setItem('brand', '');
    setRange(newRange);
  }, []);

  const handleChangeName = useCallback((e) => {
    setName(e.target.value);
    sessionStorage.setItem('name', e.target.value);
  }, []);

  return (
    <ThemeProvider theme={selectTheme}>
      <Box style={{ width: '100%' }}>
        <BrandBox>
          <CategoryBox>
            <Category>브랜드</Category>
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
          </CategoryBox>
          <SelectEmblem range={range} keyName="brand" />
        </BrandBox>
        <div>
          <Category>차급</Category>
          <SelectCheck keyName="grade" />
        </div>
        <div>
          <Category>외형</Category>
          <SelectCheck keyName="shape" />
        </div>
        <SelectContainer>
          <SelectTwoBox>
            <Category>가격</Category>
            <SelectTwo keyName="cost" />
          </SelectTwoBox>
          <SelectTwoBox>
            <Category>배기량</Category>
            <SelectTwo keyName="displacement" />
          </SelectTwoBox>
          <SelectTwoBox>
            <Category>연비</Category>
            <SelectTwo keyName="fuelEfficiency" />
          </SelectTwoBox>
        </SelectContainer>
        <SelectContainer>
          <SelectOneBox>
            <Category>모델명</Category>
            <TextField
              id="model-name"
              hiddenLabel
              variant="outlined"
              value={name}
              onChange={handleChangeName}
              inputProps={{ style: { padding: '0.725rem' } }}
            />
          </SelectOneBox>
          <SelectOneBox>
            <Category>구동방식</Category>
            <SelectOne keyName="method" />
          </SelectOneBox>
          <SelectOneBox>
            <Category>연료</Category>
            <SelectOne keyName={'fuel'} />
          </SelectOneBox>
        </SelectContainer>
      </Box>
    </ThemeProvider>
  );
};

export default SelectBox;

const Category = styled.span`
  ${({ theme }) => theme.fontStyle.body}
  font-weight: bold;
`;

const SelectCheckBox = styled.div`
  height: 260px;
`;

const SelectOneBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
`;

const SelectTwoBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
`;

const CategoryBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 12px;
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

const Box = styled.div`
  display: grid;
  grid-template-columns: 5fr 3fr;
  grid-template-rows: repeat(3, auto);
  column-gap: 1rem;
  row-gap: 1.5rem;
  margin-bottom: 2rem;
`;

const BrandBox = styled.div`
  grid-row: 1 / 3;
`;

const SelectContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  row-gap: 0.725rem;
`;
