import { styled } from '@mui/system';
import { TextField } from '@mui/material';

const MyTextField = styled(TextField)`
  .css-r5rpbv-MuiInputBase-root-MuiInput-root {
    :before {
      content: none;
    }
    :after {
      content: none;
    }
  }
`;

export default MyTextField;
