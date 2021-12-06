import { useRecoilState } from 'recoil';
import conditionSelector from '../../recoil/selector';
import { getConditions, resetSessionStorage } from '../../utils/searchCondition';
import { Button } from '@mui/material';
import styled from 'styled-components';

const SearchButtons = ({ setConditions }) => {
  const [recoilStates, setRecoilStates] = useRecoilState(conditionSelector);
  const handleSearchClick = (e) => {
    console.log('ORIGIN CONDITIONS:', recoilStates);
    const searchConditions = Object.keys(recoilStates);
    searchConditions.forEach((con) => sessionStorage.setItem(con, recoilStates[con]));
    setConditions(getConditions());
  };

  const handleResetClick = () => {
    setRecoilStates();
    resetSessionStorage();
  };
  return (
    <ButtonBox>
      <Button
        style={{ gridColumn: '2/ 3' }}
        sx={buttonStyle}
        variant="contained"
        disableElevation
        onClick={handleSearchClick}
      >
        조건 검색
      </Button>
      <Button sx={buttonStyle} variant="outlined" onClick={handleResetClick}>
        초기화
      </Button>
    </ButtonBox>
  );
};

export default SearchButtons;

const ButtonBox = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 1rem;
  @media screen and (max-width: 900px) {
    display: flex;
  }
`;

const buttonStyle = {
  width: '100%',
  fontSize: '1rem',
};
