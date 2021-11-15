import React from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import SelectBox from "../components/SelectBox";
import { maintitle } from "../css/fonts";

const Search = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={0}>
        <Grid item xs={2} />
        <Grid item xs={8}>
          <ContentBox>
            <Title>어떤 차가 궁금하신가요?</Title>
            <SelectBox />
          </ContentBox>
        </Grid>
        <Grid item xs={2} />
      </Grid>
    </Box>
  );
};

export default Search;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.p`
  ${maintitle}
`;
