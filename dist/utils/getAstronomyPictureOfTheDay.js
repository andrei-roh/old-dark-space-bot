"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAstronomyPictureOfTheDay = void 0;
const constants_1 = require("../constants");
const getAstronomyPictureOfTheDay = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield fetch(`${constants_1.APOD_URL}?api_key=${process.env.NASA_API}`)
        .then((res) => res.json())
        .then((data) => data)
        .catch(() => null);
});
exports.getAstronomyPictureOfTheDay = getAstronomyPictureOfTheDay;
