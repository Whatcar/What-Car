import SelectEmblem from './SelectEmblem';
import styled from 'styled-components';
import { ThemeProvider } from '@mui/material';
import { selectTheme } from '../../css/muiTheme';
import ConditionButtons from './ConditionButtons';
import ConditionSlider from './ConditionSlider';
import SelectName from './SelectName';
import SelectedConditions from './SelectedConditions';
import { useRecoilValue } from 'recoil';
import { eachConditionSelector } from '../../recoil/selector';

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
  const recoilState = useRecoilValue(eachConditionSelector);
  const chipList = recoilState.filter((item) => item !== '전체~' && item.length);

  return (
    <ThemeProvider theme={selectTheme}>
      <Box>
        <SelectEmblem />
        {getAccordion('checkbox')}
        {getAccordion('slider')}
        <SelectName />
        <SelectedConditions conditions={chipList} />
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
