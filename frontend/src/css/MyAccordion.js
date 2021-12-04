import { styled } from '@mui/system';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { fontSize } from './theme';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';

const MyAccordion = styled((props) => <Accordion disableGutters elevation={0} square {...props} />)(
  ({ theme }) => ({
    padding: '0.25rem 0',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    width: '100%',
    '&:before': {
      display: 'none',
    },
  }),
);

export const MyAccordionSummary = styled((props) => (
  <AccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.8rem', padding: '0.1rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    margin: 0,
    marginLeft: theme.spacing(1),
    display: 'grid',
    gridTemplateColumns: '4.5rem auto auto',
    alignItems: 'center',
    '& span + span': {
      width: 'auto',
      fontSize: `${fontSize.S}`,
      lineHeight: '1.25rem',
      margin: 0,
    },
  },
  '&.Mui-focusVisible': {
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
}));

export const MyAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  '& div': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default MyAccordion;
