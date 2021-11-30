import { useCallback } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import * as atom from '../../recoil/atom';
import MyTextField from '../../css/MyTextField';
import { getSessionItem } from '../../utils/searchCondition';

const SelectName = () => {
  const nowName = getSessionItem('name', '');
  const [name, setName] = useRecoilState(atom.name);

  const handleChangeName = useCallback((e) => {
    setName(e.target.value);
    sessionStorage.setItem('name', e.target.value);
  }, []);

  return (
    <SelectOneBox>
      <Category>모델명</Category>
      <MyTextField
        id="model-name"
        hiddenLabel
        variant="standard"
        value={name}
        onChange={handleChangeName}
        inputProps={{ style: { padding: 0, fontSize: '1rem' } }}
        placeholder="원하는 모델명을 입력하세요"
      />
    </SelectOneBox>
  );
};

const Category = styled.span`
  ${({ theme }) => theme.fontStyle.body}
  font-weight: bold;
`;

const SelectOneBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;
`;

export default SelectName;
