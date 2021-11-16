const setCheckedValues = (newValue, values, setValues) => {
  const newValueIdx = values.findIndex((item) => item === newValue);
  if (newValueIdx === -1) {
    setValues([...values, newValue]);
  } else {
    const newValues = [...values];
    newValues.splice(newValueIdx, 1);
    setValues(newValues);
  }
};

export default setCheckedValues;
