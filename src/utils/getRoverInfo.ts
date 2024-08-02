import TelegramBot from 'node-telegram-bot-api';
import { RoverType } from '../types';
import { fetchRoverPhotos } from './fetchRoverPhotos';
import { setPhotoLibraryCaption } from './setPhotoLibraryCaption';

export const getRoverInfo = async (
  bot: TelegramBot,
  type: RoverType,
  chatId: number
) => {
  const photos = await fetchRoverPhotos(type, 1000, 1);
  const info = photos ? photos[0].rover : null;

  if (info) {
    const { name, launch_date, status, max_sol, max_date, total_photos } = info;

    await bot.sendMessage(
      chatId,
      setPhotoLibraryCaption(
        name,
        launch_date,
        status,
        max_sol,
        max_date,
        total_photos
      )
    );
  }
};
