import { MAX_DESCRIPTION_LENGTH } from "../constants";

export const getHTMLCaption = (
  title: string,
  description: string,
  date: string
) =>
  `<b>${title}</b>
${description.length >= MAX_DESCRIPTION_LENGTH 
  ? `${description.slice(0, MAX_DESCRIPTION_LENGTH * 0.85)}... 
More: https://andrei-roh.github.io/andrei-roh/` 
  : description}
<i>${date}</i>`;
