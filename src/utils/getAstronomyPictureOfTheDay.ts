import { APOD_URL } from '../constants';
import { IAstronomyPictureOfTheDayData } from '../types';

export const getAstronomyPictureOfTheDay =
  async (): Promise<IAstronomyPictureOfTheDayData | null> => {
    return await fetch(`${APOD_URL}?api_key=${process.env.NASA_API}`)
      .then((res) => res.json())
      .then((data) => data as IAstronomyPictureOfTheDayData)
      .catch(() => null);
  };
