import { useCallback, useEffect, useState } from 'react';
import SelectEmblem from './SelectEmblem';
import styled from 'styled-components';
import {
  TextField,
  ThemeProvider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { selectTheme } from '../../css/muiTheme';
import { getSessionItem } from '../../utils/searchCondition';
import AccordionComponent from './AccordionComponent';

const SelectAccordion = () => {
  const nowRange = getSessionItem('range', '전체');
  const nowName = getSessionItem('name', '');
  const nowBrand = getSessionItem('brand', '');
  const [range, setRange] = useState(nowRange);
  const [name, setName] = useState(nowName);
  const [brand, setBrand] = useState(nowBrand);

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
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography sx={{ width: '25%', flexShrink: 0 }}>브랜드</Typography>
            <Typography sx={{ color: 'text.secondary' }}>{brand}</Typography>
          </AccordionSummary>
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
            <SelectEmblem range={range} keyName="brand" setState={setBrand} />
          </AccordionDetails>
        </Accordion>
        <AccordionComponent index="check" />
        <AccordionComponent index="one" />
        <AccordionComponent index="two" />
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography sx={{ width: '25%', flexShrink: 0 }}>모델명</Typography>
            <Typography sx={{ color: 'text.secondary' }}>{name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              id="model-name"
              hiddenLabel
              variant="outlined"
              value={name}
              onChange={handleChangeName}
              sx={{ width: '100%' }}
              inputProps={{ style: { padding: '0.725rem' } }}
            />
          </AccordionDetails>
        </Accordion>
      </Box>
    </ThemeProvider>
  );
};

export default SelectAccordion;

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
  display: none;
  @media screen and (max-width: 900px) {
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
  }
`;
