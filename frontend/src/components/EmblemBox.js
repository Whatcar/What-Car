import styled from "styled-components";
import get_emblem from "../utils/get_emblem";
import { desc } from "../css/fonts";
import { blue } from "../css/colors";

const EmblemBox = ({ range = "전체" }) => {
  const emblem_list = get_emblem(range).map((emblem) => {
    const name = emblem[0];
    const adress = emblem[1];
    return (
      <Emblem key={name} clicked={true}>
        <Img key={`${name}`} art={`${name}`} src={`${adress}`} />
        <Name>{name}</Name>
      </Emblem>
    );
  });

  return <Box>{emblem_list}</Box>;
};

const Box = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  margin: 16px;
  height: 240px;
  overflow: auto;
  padding: 4px;
  padding-right: 16px;
  column-gap: 6px;
  row-gap: 4px;
  /* justify-content: center; */
`;

const Emblem = styled.div`
  justify-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border: ${(props) => (props.clicked ? `1px solid ${blue.light}` : "none")};
  cursor: pointer;
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
