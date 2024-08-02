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
exports.getRoverPhotos = void 0;
const getRoverPhotos = (bot, state, type, chatId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!state.isWaitingSolAndPage) {
        yield bot.sendMessage(chatId, `Please, send Sol and Page numbers using & as separator 
For example: 1000&2`);
        state.isWaitingSolAndPage = true;
        state.type = type;
    }
});
exports.getRoverPhotos = getRoverPhotos;
