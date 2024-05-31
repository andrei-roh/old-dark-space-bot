import { IMarsWeather } from '../types';
import { MARS_WEATHER_URL } from '../constants';

export const getMarsWeather = async (): Promise<IMarsWeather | null> => {
  return await fetch(`${MARS_WEATHER_URL}?api_key=${process.env.NASA_API}&feedtype=json&ver=1.0`)
    .then((res) => res.json())
    .then((data) => data as IMarsWeather)
    .catch(() => null);
};
