import SelectEmblem from './SelectEmblem';
import styled from 'styled-components';
import { ThemeProvider } from '@mui/material';
import { selectTheme } from '../../css/muiTheme';
import ConditionButtons from './ConditionButtons';
import ConditionSlider from './ConditionSlider';
import SelectName from './SelectName';

const getAccordion = (method) => {
  let cons = [];
  let consList = [];
  if (method === 'checkbox') {
    cons = ['grade', 'shape', 'method', 'fuel'];
    consList = cons.map((condition) => <ConditionButtons key={condition} condition={condition} />);
  } else {
    cons = ['displacement', 'fuelEfficiency', 'cost'];
    consList = cons.map((condition) => <ConditionSlider key={condition} condition={condition} />);
  }
  return consList;
};

const SelectBox = () => {
  return (
    <ThemeProvider theme={selectTheme}>
      <Box>
        <SelectEmblem />
        {getAccordion('checkbox')}
        {getAccordion('slider')}
        <SelectName />
      </Box>
    </ThemeProvider>
  );
};

export default SelectBox;

const Box = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1rem;
  margin-bottom: 2rem;
  align-items: start;

  @media screen and (max-width: 900px) {
    display: flex;
    flex-direction: column;
  }
`;
