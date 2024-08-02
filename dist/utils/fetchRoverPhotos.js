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
exports.fetchRoverPhotos = void 0;
const constants_1 = require("../constants");
const getUrlByRoverType = (type) => {
    switch (type) {
        case "spirit" /* RoverType.Spirit */:
            return constants_1.SPIRIT_PHOTO_URL;
        case "opportunity" /* RoverType.Opportunity */:
            return constants_1.OPPORTUNITY_PHOTO_URL;
        case "curiosity" /* RoverType.Curiosity */:
            return constants_1.CURIOSITY_PHOTO_URL;
        case "perseverance" /* RoverType.Perseverance */:
            return constants_1.PERSEVERANCE_PHOTO_URL;
    }
};
const fetchRoverPhotos = (type, sol, page) => __awaiter(void 0, void 0, void 0, function* () {
    const rootUrl = getUrlByRoverType(type);
    return yield fetch(`${rootUrl}?sol=${sol}&page=${page}&api_key=${process.env.NASA_API}`)
        .then((res) => res.json())
        .then((data) => data.photos)
        .catch(() => null);
});
exports.fetchRoverPhotos = fetchRoverPhotos;
