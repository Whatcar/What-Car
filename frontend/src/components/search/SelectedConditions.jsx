import MyAccordion, { MyAccordionSummary } from '../../css/MyAccordion';
import { AccordionDetails, Chip } from '@mui/material';
import styled from 'styled-components';

const style = {
  lineHeight: '30px',
  margin: '2px',
};

const SelectedConditions = ({ conditions }) => {
  const chipList = conditions.map((condition, idx) => {
    const handleDelete = () => {
      console.info('You clicked the delete icon.');
    };
    return (
      <Chip
        key={`${condition}-${idx}`}
        style={style}
        label={condition}
        variant="outlined"
        color="primary"
        // onDelete={handleDelete}
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
