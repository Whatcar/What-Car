import { styled } from '@mui/system';
import { Grid } from '@mui/material';

export const BoxGrid = styled(Grid)`
  padding-top: 5rem;
  justify-content: center;
  @media screen and (max-width: 480px) {
    padding-top: 0;
  }
`;

export const DescGrid = styled(Grid)`
  width: 100%;

  @media screen and (max-width: 900px) {
    order: 1;
  }
`;

export const ImgGrid = styled(Grid)`
  @media screen and (max-width: 900px) {
    order: 0;
  }
`;
