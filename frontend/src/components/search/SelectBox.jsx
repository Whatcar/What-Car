import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useCallback, useState } from 'react';
import SelectEmblem from './SelectEmblem';
import styled from 'styled-components';
import SelectCheck from './SelectCheck';
import { TextField, ThemeProvider } from '@mui/material';
import SelectOne from './SelectOne';
import SelectTwo from './SelectTwo';
import { selectTheme } from '../../css/muiTheme';

const SelectBox = () => {
  const nowRange = sessionStorage.getItem('range') ? sessionStorage.getItem('range') : '전체';
  const nowName = sessionStorage.getItem('name') ? sessionStorage.getItem('name') : '';
  const [range, setRange] = useState(nowRange);
  const [name, setName] = useState(nowName);

  const isDisabled = (label) => {
    return range === label;
  };

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
        <Grid container spacing={1} columns={8}>
          <Grid item xs={5} style={{ width: '100%' }}>
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
          </Grid>
          <Grid item xs={3}>
            <Category>차급</Category>
            <SelectCheck keyName="grade" />
            <Category>외형</Category>
            <SelectCheck keyName="shape" />
            <SelectOneBox>
              <Category>모델명</Category>
              <TextField
                id="model-name"
                hiddenLabel
                variant="outlined"
                value={name}
                onChange={handleChangeName}
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
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default SelectBox;

const Category = styled.span`
  ${({ theme }) => theme.fontStyle.body}
  font-weight: bold;
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
  ${({ theme }) => theme.fontStyle.body}
  color: ${(props) => (props.disabled ? props.theme.colors.blueM : '')}
`;
