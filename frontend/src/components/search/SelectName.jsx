import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import * as atom from '../../recoil/atom';
import MyTextField from '../../css/MyTextField';
import MyAccordion, { MyAccordionSummary } from '../../css/MyAccordion';

const SelectName = () => {
  const [name, setName] = useRecoilState(atom.name);

  const handleChangeName = useCallback(
    (e) => {
      setName(e.target.value);
      sessionStorage.setItem('name', e.target.value);
    },
    [setName],
  );

  const style = {
    width: '100%',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(0deg)',
    },
  };

  return (
    <MyAccordion key="name" sx={style}>
      <MyAccordionSummary aria-controls="panel1a-content" id="panel1a-header">
        <label htmlFor="model-name">
          <span>모델명</span>
        </label>
        <MyTextField
          id="model-name"
          hiddenLabel
          variant="standard"
          value={name}
          onChange={handleChangeName}
          inputProps={{ style: { padding: 0, fontSize: '0.875rem' } }}
          placeholder="원하는 모델명을 입력하세요"
        />
      </MyAccordionSummary>
    </MyAccordion>
  );
};

export default SelectName;
