import styled from "styled-components";
import { FormControl, Select, MenuItem } from "@mui/material";
import { useCallback, useState } from "react";

const SelectOne = ({ select }) => {
  const [value, setValue] = useState("전체");
  const handleChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const selectList = select.map((item) => {
    return (
      <MenuItem key={item} value={item}>
        {item}
      </MenuItem>
    );
  });
  return (
    <Box>
      <FormControl fullWidth>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          displayEmpty
          onChange={handleChange}
        >
          {selectList}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectOne;

const Box = styled.div``;
