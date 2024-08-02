"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setApodCaption = void 0;
const constants_1 = require("../constants");
const setApodCaption = (title, description, date) => `<b>${title}</b>
${description.length >= constants_1.MAX_DESCRIPTION_LENGTH
    ? `${description.slice(0, constants_1.MAX_DESCRIPTION_LENGTH * 0.85)}... 
See More: https://andrei-roh.github.io/andrei-roh/`
    : description}
<i>${date}</i>`;
exports.setApodCaption = setApodCaption;
