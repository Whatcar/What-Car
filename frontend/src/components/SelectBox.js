import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useCallback, useState } from "react";
import EmblemBox from "./EmblemBox";

const SelectBox = () => {
  const [range, setRange] = useState("전체");
  const handleClickRange = useCallback((e) => {
    setRange(e.target.innerText);
  }, []);

  return (
    <Box style={{ width: "100%" }}>
      <Grid container spacing={1} columns={8}>
        <Grid item xs={5} style={{ width: "100%" }}>
          <button onClick={handleClickRange}>전체</button>
          <button onClick={handleClickRange}>국산</button>
          <button onClick={handleClickRange}>수입</button>
          <EmblemBox range={range} />
        </Grid>
        <Grid item xs={3}>
          우측
        </Grid>
      </Grid>
    </Box>
  );
};

export default SelectBox;
