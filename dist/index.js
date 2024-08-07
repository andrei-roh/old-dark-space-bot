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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const utils_1 = require("./utils");
const getRoverPhotos_1 = require("./utils/getRoverPhotos");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const token = process.env.TOKEN;
app.use(express_1.default.json());
app.get('/', (_req, res) => {
    res.send(`<main style='width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center'>
    <h2>Old Dark Space Telegram Bot</h1>
    <img width="300" alt="NASA" src="https://cdn.dribbble.com/users/1809003/screenshots/5705402/media/01919c4385777d42a7831766e0872598.gif">
    <h3>Status: Working</h2>
</main>`);
});
app.listen(port);
if (token) {
    const bot = new node_telegram_bot_api_1.default(token, { polling: true });
    const state = {
        type: "curiosity" /* RoverType.Curiosity */,
        isWaitingSolAndPage: false,
    };
    bot.on('message', (msg) => __awaiter(void 0, void 0, void 0, function* () {
        const chatId = msg.chat.id;
        const text = msg.text;
        if (text === '/apod') {
            const apod = yield (0, utils_1.fetchAstronomyPictureOfTheDay)();
            if (apod) {
                const { title, url, explanation, date } = apod;
                yield bot.sendPhoto(chatId, url, {
                    caption: (0, utils_1.setApodCaption)(title, explanation, date),
                    parse_mode: 'HTML',
                });
            }
        }
        if (text === '/spirit_info') {
            (0, utils_1.getRoverInfo)(bot, "spirit" /* RoverType.Spirit */, chatId);
        }
        if (text === '/opportunity_info') {
            (0, utils_1.getRoverInfo)(bot, "opportunity" /* RoverType.Opportunity */, chatId);
        }
        if (text === '/curiosity_info') {
            (0, utils_1.getRoverInfo)(bot, "curiosity" /* RoverType.Curiosity */, chatId);
        }
        if (text === '/perseverance_info') {
            (0, utils_1.getRoverInfo)(bot, "perseverance" /* RoverType.Perseverance */, chatId);
        }
        if (state.isWaitingSolAndPage) {
            if (text) {
                const [sol, page] = text.split('&');
                const curiosityPhotos = yield (0, utils_1.fetchRoverPhotos)(state.type, sol, page);
                if (curiosityPhotos && curiosityPhotos.length > 0) {
                    curiosityPhotos.forEach((photo) => __awaiter(void 0, void 0, void 0, function* () {
                        yield bot.sendPhoto(chatId, photo.img_src, {
                            caption: (0, utils_1.setPhotoCaption)(photo.earth_date, photo.camera.full_name),
                            parse_mode: 'HTML',
                        });
                    }));
                }
                else {
                    yield bot.sendMessage(chatId, `Cannot found photos for sol: ${sol}, page: ${page}`);
                }
                state.isWaitingSolAndPage = false;
            }
        }
        if (text === '/get_spirit_photos') {
            (0, getRoverPhotos_1.getRoverPhotos)(bot, state, "spirit" /* RoverType.Spirit */, chatId);
        }
        if (text === '/get_opportunity_photos') {
            (0, getRoverPhotos_1.getRoverPhotos)(bot, state, "opportunity" /* RoverType.Opportunity */, chatId);
        }
        if (text === '/get_curiosity_photos') {
            (0, getRoverPhotos_1.getRoverPhotos)(bot, state, "curiosity" /* RoverType.Curiosity */, chatId);
        }
        if (text === '/get_perseverance_photos') {
            (0, getRoverPhotos_1.getRoverPhotos)(bot, state, "perseverance" /* RoverType.Perseverance */, chatId);
        }
    }));
}
