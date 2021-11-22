import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const CarHover = ({ hover, name, grade, cost, carId }) => {
  const navigate = useNavigate();

  const handleDescClick = () => {
    navigate(`/result/${carId}`);
  };
  return (
    <Box hover={hover}>
      <p>{name}</p>
      <p>{grade}</p>
      <p>{cost}</p>
      <button onClick={handleDescClick}>상세보기</button>
    </Box>
  );
};

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  color: white;
  /* top: 0; */
  &:hover {
    opacity: 1;
  }
`;

export default CarHover;
