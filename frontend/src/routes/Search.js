import React from "react";
import styled from "styled-components";
import Container from "@mui/material/Container";

import get_emblem from "../utils/get_emblem";

const emblem_list = get_emblem().map((emblem) => {
  return <img key={`${emblem[0]}`} art={`${emblem[0]}`} src={`${emblem[1]}`} />;
});

const Search = () => {
  return (
    <Container>
      hello!
      <Box />
    </Container>
  );
};

export default Search;

const Box = styled.div`
  width: 100%;
  height: 100%;
  background-color: "red";
`;
