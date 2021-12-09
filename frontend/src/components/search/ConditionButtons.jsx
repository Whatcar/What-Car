import styled from 'styled-components';
import selectList from '../../data/selectList';
import { setCheckedValuesArray } from '../../utils/searchCondition';
import { useRecoilState } from 'recoil';
import * as atom from '../../recoil/atom';
import { AccordionDetails, Divider } from '@mui/material';
import MyAccordion, { MyAccordionSummary } from '../../css/MyAccordion';
import { conditionDesc, categoryDesc } from '../../data/description';
import DescButton from './DescButton';
import { colors } from '../../css/theme';

import { ReactComponent as LightCar } from '../../img/search/light.svg';
import { ReactComponent as SmallCar } from '../../img/search/small.svg';
import { ReactComponent as SMiddleCar } from '../../img/search/small-middle.svg';
import { ReactComponent as Sedan } from '../../img/search/Sedan.svg';
import { ReactComponent as MLargeCar } from '../../img/search/middle-large.svg';
import { ReactComponent as LargeCar } from '../../img/search/large.svg';
import { ReactComponent as SUV } from '../../img/search/SUV.svg';
import { ReactComponent as Hatchback } from '../../img/search/Hatchback.svg';
import { ReactComponent as Convertible } from '../../img/search/Convertible.svg';
import { ReactComponent as Wagon } from '../../img/search/Wagon.svg';
import { ReactComponent as Coupe } from '../../img/search/Coupe.svg';
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
  const buttonList = conditions.map((item, idx) => {
    const svgStyle = (key) => {
      const display = item === key ? 'block' : 'none';
      const checked = values.includes(item) ? colors.blueM : colors.black500;
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

    if (condition === 'fuel') {
      return (
        <ButtonBox
          key={item}
          checked={values.includes(item)}
          borderTop={!!(idx > 2)}
          borderLeft={!!(idx % 3)}
        >
          <ButtonLabel htmlFor={item}>
            {item}
            <input
              id={item}
              type="checkbox"
              value={item}
              defaultChecked={false}
              onClick={handleClick}
              style={{ display: 'none' }}
            />
            {description && (
              <DescButton
                idx={idx}
                item={item}
                description={description}
                checked={values.includes(item)}
              />
            )}
          </ButtonLabel>
        </ButtonBox>
      );
    }

    return (
      <ButtonBox key={item} checked={values.includes(item)}>
        <ButtonLabel htmlFor={item}>
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
          <input
            id={item}
            type="checkbox"
            value={item}
            defaultChecked={false}
            onClick={handleClick}
            style={{ display: 'none' }}
          />
        </ButtonLabel>
        <NameLabel item={item} htmlFor={item}>
          <span>{item}</span>
          {description && (
            <DescButton
              idx={idx}
              item={item}
              description={description}
              checked={values.includes(item)}
            />
          )}
        </NameLabel>
      </ButtonBox>
    );
  });

  const isOpen = (condition) => {
    return condition === 'grade' || condition === 'shape' ? true : false;
  };

  return (
    <MyAccordion key={condition} defaultExpanded={isOpen(condition)}>
      <MyAccordionSummary aria-controls="panel1a-content" id="panel1a-header">
        <span>{categoryDesc[condition].title}</span>
        <span>{categoryDesc[condition].comment}</span>
        {categoryDesc[condition].desc && (
          <DescButton item={condition} description={categoryDesc[condition]} />
        )}
      </MyAccordionSummary>
      <AccordionDetails style={{ padding: '8px 16px' }}>
        <Box>
          <ButtonLineBox num={condition === 'fuel' ? 3 : 2} />
          {buttonList}
        </Box>
      </AccordionDetails>
    </MyAccordion>
  );
};

export default ConditionButtons;

const Box = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 1fr;
  width: 100%;
  height: 150px;
  position: relative;
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-align: center;
  color: ${(props) => (props.checked ? props.theme.colors.blueM : props.theme.colors.black500)};
  box-sizing: border-box;
  position: relative;
  ${({ theme }) => theme.fontStyle.desc}
`;

const ButtonLabel = styled.label`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const NameLabel = styled.label`
  box-sizing: border-box;
  width: 100%;
  padding-top: 0.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  span {
    + label {
      width: 14px;
      height: 14px;
      margin-left: 2px;
      margin-top: -1px;
    }
  }
`;

const LineBox = styled.div`
  display: flex;
  flex-direction: ${({ axis }) => (axis === 'horizontal' ? 'column' : 'row')};
  justify-content: space-evenly;
  position: absolute;
  width: 100%;
  height: 100%;
`;

const ButtonLineBox = ({ num }) => {
  return (
    <>
      <LineBox axis="vertical">
        <Divider orientation="vertical" />
        <Divider orientation="vertical" />
      </LineBox>
      <LineBox axis="horizontal">
        <Divider />
        {num === 3 && <Divider />}
      </LineBox>
    </>
  );
};
