"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHTMLCaption = void 0;
const getHTMLCaption = (title, description, date) => `<b>${title}</b>
${description}
<i>${date}</i>`;
exports.getHTMLCaption = getHTMLCaption;
