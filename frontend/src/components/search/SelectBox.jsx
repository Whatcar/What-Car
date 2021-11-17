import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useCallback, useEffect, useState } from 'react';
import SelectEmblem from './SelectEmblem';
import { body } from '../../css/fonts';
import styled from 'styled-components';
import SelectCheck from './SelectCheck';
import { TextField } from '@mui/material';
import SelectOne from './SelectOne';
import SelectTwo from './SelectTwo';

const SelectBox = () => {
  const nowName = sessionStorage.getItem('name') ? sessionStorage.getItem('name') : '';
  const [range, setRange] = useState(sessionStorage.getItem('range'));
  const [name, setName] = useState(nowName);

  const isDisabled = (label) => {
    return range === label;
  };

  const handleClickRange = useCallback((e) => {
    console.log('button clicked');
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
    <Box style={{ width: '100%' }}>
      <Grid container spacing={1} columns={8}>
        <Grid item xs={5} style={{ width: '100%' }}>
          <div>
            <Category>브랜드</Category>
            <button disabled={isDisabled('전체')} onClick={handleClickRange}>
              전체
            </button>
            <button disabled={isDisabled('국산')} onClick={handleClickRange}>
              국산
            </button>
            <button disabled={isDisabled('수입')} onClick={handleClickRange}>
              수입
            </button>
          </div>
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
  );
};

export default SelectBox;

const Category = styled.span`
  ${body}
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
