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
exports.getRoverInfo = void 0;
const fetchRoverPhotos_1 = require("./fetchRoverPhotos");
const setPhotoLibraryCaption_1 = require("./setPhotoLibraryCaption");
const getRoverInfo = (bot, type, chatId) => __awaiter(void 0, void 0, void 0, function* () {
    const photos = yield (0, fetchRoverPhotos_1.fetchRoverPhotos)(type, 1000, 1);
    const info = photos ? photos[0].rover : null;
    if (info) {
        const { name, launch_date, status, max_sol, max_date, total_photos } = info;
        yield bot.sendMessage(chatId, (0, setPhotoLibraryCaption_1.setPhotoLibraryCaption)(name, launch_date, status, max_sol, max_date, total_photos));
    }
});
exports.getRoverInfo = getRoverInfo;
