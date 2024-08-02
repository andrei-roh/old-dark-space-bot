import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';
import {
  fetchAstronomyPictureOfTheDay,
  fetchRoverPhotos,
  setApodCaption,
  setPhotoCaption,
  getRoverInfo,
} from './utils';
import { IState, RoverType } from './types';
import { getRoverPhotos } from './utils/getRoverPhotos';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const token = process.env.TOKEN;

app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.send(`<main style='width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center'>
    <h2>Old Dark Space Telegram Bot</h1>
    <img width="300" alt="NASA" src="https://cdn.dribbble.com/users/1809003/screenshots/5705402/media/01919c4385777d42a7831766e0872598.gif">
    <h3>Status: Working</h2>
</main>`);
});

app.listen(port);

if (token) {
  const bot = new TelegramBot(token, { polling: true });
  const state: IState = {
    type: RoverType.Curiosity,
    isWaitingSolAndPage: false,
  };

  bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text === '/apod') {
      const apod = await fetchAstronomyPictureOfTheDay();

      if (apod) {
        const { title, url, explanation, date } = apod;

        await bot.sendPhoto(chatId, url, {
          caption: setApodCaption(title, explanation, date),
          parse_mode: 'HTML',
        });
      }
    }

    if (text === '/spirit_info') {
      getRoverInfo(bot, RoverType.Spirit, chatId);
    }

    if (text === '/opportunity_info') {
      getRoverInfo(bot, RoverType.Opportunity, chatId);
    }

    if (text === '/curiosity_info') {
      getRoverInfo(bot, RoverType.Curiosity, chatId);
    }

    if (text === '/perseverance_info') {
      getRoverInfo(bot, RoverType.Perseverance, chatId);
    }

    if (state.isWaitingSolAndPage) {
      if (text) {
        const [sol, page] = text.split('&');

        const curiosityPhotos = await fetchRoverPhotos(state.type, sol, page);

        if (curiosityPhotos && curiosityPhotos.length > 0) {
          curiosityPhotos.forEach(async (photo) => {
            await bot.sendPhoto(chatId, photo.img_src, {
              caption: setPhotoCaption(
                photo.earth_date,
                photo.camera.full_name
              ),
              parse_mode: 'HTML',
            });
          });
        } else {
          await bot.sendMessage(
            chatId,
            `Cannot found photos for sol: ${sol}, page: ${page}`
          );
        }

        state.isWaitingSolAndPage = false;
      }
    }

    if (text === '/get_spirit_photos') {
      getRoverPhotos(bot, state, RoverType.Spirit, chatId);
    }

    if (text === '/get_opportunity_photos') {
      getRoverPhotos(bot, state, RoverType.Opportunity, chatId);
    }

    if (text === '/get_curiosity_photos') {
      getRoverPhotos(bot, state, RoverType.Curiosity, chatId);
    }

    if (text === '/get_perseverance_photos') {
      getRoverPhotos(bot, state, RoverType.Perseverance, chatId);
    }
  });
}
