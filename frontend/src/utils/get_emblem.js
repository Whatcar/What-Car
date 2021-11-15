import emblem_img from "../img/emblem_list.json";
import emblem_name from "../img/emblem_name.json";

export const get_domestic_emblem = () => {
  const domestic_name = emblem_name.국산;
  const domestic_emblem = domestic_name.map((name) => [name, emblem_img[name]]);
  return domestic_emblem;
};

export const get_imported_emblem = () => {
  const imported_name = emblem_name.수입;
  const imported_emblem = imported_name.map((name) => [name, emblem_img[name]]);
  return imported_emblem;
};

const get_emblem = () => {
  const whole_name = [...emblem_name.국산, ...emblem_name.수입];
  const whole_emblem = whole_name.map((name) => [name, emblem_img[name]]);
  return whole_emblem;
};

export default get_emblem;
