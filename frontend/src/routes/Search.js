import React from "react";
import get_emblem from "../utils/get_emblem";

const emblem_list = get_emblem().map((emblem) => {
  console.log(emblem);
  return <img key={`${emblem[0]}`} art={`${emblem[0]}`} src={`${emblem[1]}`} />;
});

export default function Search() {
  return <div>{emblem_list}</div>;
}
