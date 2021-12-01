import styled from 'styled-components';
import selectList from '../../data/selectList';
import { setCheckedValuesArray } from '../../utils/searchCondition';
import { useRecoilState } from 'recoil';
import * as atom from '../../recoil/atom';
import { AccordionDetails } from '@mui/material';
import MyAccordion, { MyAccordionSummary } from '../../css/MyAccordion';
import { conditionDesc, categoryDesc } from '../../data/description';
import DescButton from './DescButton';
import { colors } from '../../css/theme';

import { ReactComponent as LightCar } from '../../img/search/light.svg';
import { ReactComponent as SmallCar } from '../../img/search/small.svg';
import { ReactComponent as SMiddleCar } from '../../img/search/small-middle.svg';
import { ReactComponent as Sedan } from '../../img/search/sedan.svg';
import { ReactComponent as MLargeCar } from '../../img/search/middle-large.svg';
import { ReactComponent as LargeCar } from '../../img/search/large.svg';
import { ReactComponent as SUV } from '../../img/search/SUV.svg';
import { ReactComponent as Hatchback } from '../../img/search/hatchback.svg';
import { ReactComponent as Convertible } from '../../img/search/convertible.svg';
import { ReactComponent as Wagon } from '../../img/search/wagon.svg';
import { ReactComponent as Coupe } from '../../img/search/coupe.svg';
import { ReactComponent as FF } from '../../img/search/FF.svg';
import { ReactComponent as FR } from '../../img/search/FR.svg';
import { ReactComponent as MR } from '../../img/search/MR.svg';
import { ReactComponent as AWD } from '../../img/search/AWD.svg';
import { ReactComponent as FWD } from '../../img/search/FWD.svg';
import { ReactComponent as RR } from '../../img/search/RR.svg';

const ConditionButtons = ({ condition }) => {
  const [values, setValues] = useRecoilState(atom[condition]);

  const getConditionDesc = (item) => {
    const conDesc = conditionDesc[condition];
    let _item = item;
    if (item === '4WD') {
      _item = 'FWD';
    } else if (item.includes('/')) {
      _item = item.split('/')[1];
    }
    if (!conDesc) return null;
    const itemDesc = conDesc[_item];
    if (!itemDesc) return null;
    const description = {
      desc: itemDesc.desc ? itemDesc.desc : null,
      good: itemDesc.good ? itemDesc.good : null,
      bad: itemDesc.bad ? itemDesc.bad : null,
    };
    return description;
  };

  const conditions = selectList[condition];
  const buttonList = conditions.map((item) => {
    const svgStyle = (key) => {
      const display = item === key ? 'block' : 'none';
      const checked = values.includes(item) ? colors.blueM : 'black';
      return {
        display,
        fill: checked,
        width: '4.5rem',
      };
    };

    const handleClick = (e) => {
      const newValue = e.target.value;
      const newValues = setCheckedValuesArray(newValue, values);
      setValues(newValues);
    };

    const description = getConditionDesc(item);

    return (
      <Label key={item} htmlFor={item} checked={values.includes(item)}>
        <LightCar style={svgStyle('경형')} />
        <SmallCar style={svgStyle('소형')} />
        <SMiddleCar style={svgStyle('준중형')} />
        <Sedan style={svgStyle('중형')} />
        <MLargeCar style={svgStyle('준대형')} />
        <LargeCar style={svgStyle('대형')} />
        <SUV style={svgStyle('SUV')} />
        <Sedan style={svgStyle('세단')} />
        <Hatchback style={svgStyle('해치백')} />
        <Convertible style={svgStyle('컨버터블')} />
        <Wagon style={svgStyle('왜건')} />
        <Coupe style={svgStyle('쿠페')} />
        <FF style={svgStyle('FF')} />
        <FR style={svgStyle('FR')} />
        <MR style={svgStyle('MR')} />
        <AWD style={svgStyle('AWD')} />
        <FWD style={svgStyle('4WD')} />
        <RR style={svgStyle('RR')} />
        <div>
          {item}
          {description && (
            <DescButton item={item} desc={description.desc ? description.desc : description.good} />
          )}
        </div>
        <input
          id={item}
          type="checkbox"
          value={item}
          defaultChecked={false}
          onClick={handleClick}
          style={{ display: 'none' }}
        />
      </Label>
    );
  });

  return (
    <MyAccordion key={condition}>
      <MyAccordionSummary aria-controls="panel1a-content" id="panel1a-header">
        <span>{categoryDesc[condition].title}</span>
        <span>{categoryDesc[condition].comment}</span>
        {categoryDesc[condition].desc && (
          <DescButton item={condition} desc={categoryDesc[condition].desc} />
        )}
      </MyAccordionSummary>
      <AccordionDetails>
        <Box>{buttonList}</Box>
      </AccordionDetails>
    </MyAccordion>
  );
};

const Box = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  row-gap: 0.25rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  text-align: center;
  color: ${(props) => (props.checked ? props.theme.colors.blueM : props.theme.colors.black900)};
  padding: 0.5rem;
  box-sizing: border-box;
  ${({ theme }) => theme.fontStyle.desc}
`;

export default ConditionButtons;
