import { LinearProgress } from '@mui/material';
import styled from 'styled-components';
import carIcon from '../img/carIcon.png';

const ProgressBar = ({ progress }) => {
  return (
    <>
      <ProgressCar progress={progress}>
        <img src={carIcon} />
      </ProgressCar>
      <LinearProgress variant="determinate" color="primary" value={progress} />
    </>
  );
};

export default ProgressBar;

const ProgressCar = styled.div`
  width: ${({ progress }) => progress}%;
  transition: width 0.4s linear;
  display: flex;
  justify-content: flex-end;
  padding-left: 2rem;
  img {
    height: 1rem;
  }
`;
