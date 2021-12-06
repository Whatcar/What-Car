import MyAccordion, { MyAccordionSummary } from '../../css/MyAccordion';
import { AccordionDetails, Chip } from '@mui/material';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { eachConditionSelector } from '../../recoil/selector';

const style = {
  lineHeight: '30px',
  margin: '2px',
  backgroundColor: 'rgba(33, 149, 242, 0.1)',
};

const SelectedConditions = () => {
  const recoilState = useRecoilValue(eachConditionSelector);
  const conditions = recoilState.filter((item) => item !== '전체~' && item.length);
  const chipList = conditions.map((condition, idx) => {
    return (
      <Chip
        key={`${condition}-${idx}`}
        style={style}
        label={condition}
        variant="outlined"
        color="primary"
      />
    );
  });

  return (
    <MyAccordion defaultExpanded style={{ gridColumn: '1 / 3' }}>
      <MyAccordionSummary aria-controls="panel1a-content" id="panel1a-header">
        <span style={{ gridColumn: '1 / 3' }}>선택한 조건이 맞나요?</span>
      </MyAccordionSummary>
      <AccordionDetails style={{ padding: '0.5rem', paddingTop: 0 }}>
        {chipList.length ? chipList : <Message>현재 선택한 조건이 없습니다</Message>}
      </AccordionDetails>
    </MyAccordion>
  );
};

export default SelectedConditions;

const Message = styled.div`
  ${({ theme }) => theme.fontStyle.desc}
  padding-left: 2rem;
  color: ${({ theme }) => theme.colors.black500};
`;
