const isChecked = (name, values) => {
  console.log(name, values, 'check');
  return values.includes(name);
};

export default isChecked;
