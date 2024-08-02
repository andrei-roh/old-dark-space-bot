import TelegramBot from 'node-telegram-bot-api';
import { IState, RoverType } from '../types';

export const getRoverPhotos = async (
  bot: TelegramBot,
  state: IState,
  type: RoverType,
  chatId: number
) => {
  if (!state.isWaitingSolAndPage) {
    await bot.sendMessage(
      chatId,
      `Please, send Sol and Page numbers using & as separator 
For example: 1000&2`
    );

    state.isWaitingSolAndPage = true;
    state.type = type;
  }
};
