import styled from "styled-components";
import get_emblem from "../utils/get_emblem";
import { desc } from "../css/fonts";
import { blue } from "../css/colors";
import { useEffect, useState } from "react";

const EmblemBox = ({ range = "전체" }) => {
  const [values, setValues] = useState([]);

  useEffect(() => {
    setValues([]);
  }, [range]);

  const emblem_list = get_emblem(range).map((emblem) => {
    const name = emblem[0];
    const adress = emblem[1];

    const handleClick = (e) => {
      const newValue = e.target.value;
      const newValueIdx = values.findIndex((item) => item === newValue);
      console.log(newValue);
      if (newValueIdx === -1) {
        setValues([...values, newValue]);
      } else {
        const newValues = [...values];
        newValues.splice(newValueIdx, 1);
        setValues(newValues);
      }
    };

    const isChecked = (name) => {
      return values.includes(name);
    };

    return (
      <>
        <Emblem key={`${range}-${name}`} checked={isChecked(name)}>
          <Img art={name} src={adress} />
          <Name>{name}</Name>
          <input type="checkbox" value={name} onClick={handleClick}></input>
        </Emblem>
      </>
    );
  });

  return <Box>{emblem_list}</Box>;
};

const Box = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  height: 260px;
  overflow: auto;
  padding: 4px;
  padding-right: 16px;
  column-gap: 6px;
  row-gap: 4px;
  justify-content: center;
  align-content: start;
`;

const Emblem = styled.label`
  /* justify-self: center; */
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-width: 48px;
  height: 60px;
  border: ${(props) => (props.checked ? `1px solid ${blue.light}` : "none")};
  cursor: pointer;
  > input {
    display: none;
  }
`;

const Img = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
`;

const Name = styled.p`
  ${desc}
  text-align: center;
`;

export default EmblemBox;
