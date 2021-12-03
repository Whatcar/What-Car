import Slider from '@mui/material/Slider';
import { alpha, styled } from '@mui/material/styles';
import { colors } from './theme';

const MySlider = styled(Slider)(({ theme }) => ({
  width: '90%',
  color: `${colors.blueM}`,
  boxSizing: 'border-box',
  '& .MuiSlider-thumb': {
    width: '1rem',
    height: '1rem',
    color: 'white',
    border: `0.125rem solid ${colors.blueM}`,
    margin: 'auto',
    '&:hover, &.Mui-focusVisible': {
      boxShadow: `0px 0px 0px 4px ${alpha(colors.blueM, 0.16)}`,
    },
    '&.Mui-active': {
      boxShadow: `0px 0px 0px 8px ${alpha(colors.blueM, 0.16)}`,
    },
  },
}));

export default MySlider;
