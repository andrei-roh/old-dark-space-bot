import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';
import { getAstronomyPictureOfTheDay, getHTMLCaption } from './utils';

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

  bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text === '/apod') {
      const apod = await getAstronomyPictureOfTheDay();

      if (apod) {
        const { title, url, explanation, date } = apod;

        await bot.sendPhoto(chatId, url, {
          caption: getHTMLCaption(title, explanation, date),
          parse_mode: 'HTML',
        });
      }
    }
  });
}
