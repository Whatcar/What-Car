import { LinearProgress } from '@mui/material';
import styled from 'styled-components';

const ProgressBar = ({ progress }) => {
  console.log('render');
  return (
    <>
      <ProgressCar progress={progress}>
        <img src="/logo512.png" />
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
  padding-left: 1rem;
  img {
    width: 2rem;
    transform: scaleX(-1);
  }
`;
