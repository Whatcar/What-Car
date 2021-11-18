import emblem_img from '../data/emblem_list.json';
import emblem_name from '../data/emblem_name.json';

const getEmblem = (range) => {
  let names = [];
  if (range === '전체') {
    names = [...emblem_name.국산, ...emblem_name.수입];
  } else {
    names = emblem_name[range];
  }
  const emblem = names.map((name) => [name, emblem_img[name]]);
  return emblem;
};

export default getEmblem;
