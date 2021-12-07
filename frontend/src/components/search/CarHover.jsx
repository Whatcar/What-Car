import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const CarHover = ({ hover, name, grade, cost, carId }) => {
  const navigate = useNavigate();

  const handleDescClick = () => {
    navigate(`/search/detail/${carId}`);
  };
  return (
    <Box hover={hover}>
      <Desc>{name}</Desc>
      <Desc>{grade}</Desc>
      <Desc>{cost}</Desc>
      <Button variant="outlined" color="white" sx={{ margin: '0.5rem' }} onClick={handleDescClick}>
        상세보기
      </Button>
    </Box>
  );
};

const Box = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
  color: white;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 0;
  &:hover {
    opacity: 1;
  }
  text-align: center;
  line-height: 1.5rem;
`;

const Desc = styled.div``;

export default CarHover;
