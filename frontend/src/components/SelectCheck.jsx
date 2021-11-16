import { Checkbox, FormControlLabel } from "@mui/material";
import { useCallback } from "react";
import styled from "styled-components";

const SelectCheck = ({ check }) => {
  const handleClick = useCallback((e) => {
    console.log(e.target.value);
    return e.target.value;
  }, []);
  const checkList = check.map((shape) => {
    return (
      <FormControlLabel
        key={shape}
        control={
          <Checkbox
            value={shape}
            defaultChecked={false}
            onClick={handleClick}
          />
        }
        label={shape}
      />
    );
  });

  return <Box>{checkList}</Box>;
};

export default SelectCheck;

const Box = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 4px;
`;
