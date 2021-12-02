import MyAccordion, { MyAccordionSummary } from '../../css/MyAccordion';
import { AccordionDetails, Chip } from '@mui/material';

const SelectedConditions = (conditions) => {
  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };
  return (
    <MyAccordion defaultExpanded style={{ gridColumn: '1 / 3' }}>
      <MyAccordionSummary aria-controls="panel1a-content" id="panel1a-header">
        <span style={{ gridColumn: '1 / 3' }}>선택한 조건이 맞나요?</span>
      </MyAccordionSummary>
      <AccordionDetails>
        <Chip
          style={{ fontSize: '14px' }}
          label="Deletable"
          variant="outlined"
          onDelete={handleDelete}
        />
      </AccordionDetails>
    </MyAccordion>
  );
};

export default SelectedConditions;
