import { styled } from '@mui/system';
import Select from '@mui/material/Select';

const MySelect = styled(Select)`
  & > div {
    padding: 0.725rem;
  }
`;

export default MySelect;
