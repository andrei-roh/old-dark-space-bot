export const getHTMLCaption = (
  title: string,
  description: string,
  date: string
) =>
  `<b>${title}</b>
${description}
<i>${date}</i>`;
