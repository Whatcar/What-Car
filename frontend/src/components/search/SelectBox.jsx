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
import {
  shape_list,
  grade_list,
  method_list,
  fuel_list,
  cost_list,
  displacement_list,
  fuelEfficiency_list,
} from '../../data/select_list';

const SelectBox = () => {
  const [range, setRange] = useState('전체');
  const [brand, setBrand] = useState([]);
  const [cost, setCost] = useState([]);
  const [displacement, setDisplacement] = useState([]);
  const [fuelEfficiency, setFuelEfficiency] = useState([]);
  const [grade, setGrade] = useState([]);
  const [shape, setShape] = useState([]);
  const [name, setName] = useState('');
  const [method, setMethod] = useState('');
  const [fuel, setFuel] = useState('');

  const conditions = {
    brand,
    cost,
    displacement,
    fuelEfficiency,
    grade,
    shape,
    name,
    method,
    fuel,
  };

  // useEffect(() => {
  //   console.log('selected', conditions);
  // }, [conditions]);

  const handleClickRange = useCallback((e) => {
    setRange(e.target.innerText);
  }, []);

  const handleChangeName = useCallback((e) => {
    setName(e.target.value);
  }, []);

  return (
    <Box style={{ width: '100%' }}>
      <Grid container spacing={1} columns={8}>
        <Grid item xs={5} style={{ width: '100%' }}>
          <div>
            <Category>브랜드</Category>
            <button onClick={handleClickRange}>전체</button>
            <button onClick={handleClickRange}>국산</button>
            <button onClick={handleClickRange}>수입</button>
          </div>
          <SelectEmblem range={range} setChecked={setBrand} />
          <SelectTwoBox>
            <Category>가격</Category>
            <SelectTwo select={cost_list} setChecked={setCost} />
          </SelectTwoBox>
          <SelectTwoBox>
            <Category>배기량</Category>
            <SelectTwo select={displacement_list} setChecked={setDisplacement} />
          </SelectTwoBox>
          <SelectTwoBox>
            <Category>연비</Category>
            <SelectTwo select={fuelEfficiency_list} setChecked={setFuelEfficiency} />
          </SelectTwoBox>
        </Grid>
        <Grid item xs={3}>
          <Category>차급</Category>
          <SelectCheck check={grade_list} setChecked={setGrade} />
          <Category>외형</Category>
          <SelectCheck check={shape_list} setChecked={setShape} />
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
            <SelectOne select={method_list} setChecked={setMethod} />
          </SelectOneBox>
          <SelectOneBox>
            <Category>연료</Category>
            <SelectOne select={fuel_list} setChecked={setFuel} />
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
