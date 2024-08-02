import { CURIOSITY_PHOTO_URL, OPPORTUNITY_PHOTO_URL, PERSEVERANCE_PHOTO_URL, SPIRIT_PHOTO_URL } from '../constants';
import { IMarsRoverPhotoData, RoverType } from '../types';

const getUrlByRoverType = (type: RoverType) => {
  switch (type) {
    case RoverType.Spirit:
      return SPIRIT_PHOTO_URL;
    case RoverType.Opportunity:
      return OPPORTUNITY_PHOTO_URL;  
    case RoverType.Curiosity:
      return CURIOSITY_PHOTO_URL;
    case RoverType.Perseverance:
      return PERSEVERANCE_PHOTO_URL;
  }
};

export const fetchRoverPhotos = async (
  type: RoverType,
  sol: number | string,
  page: number | string
): Promise<IMarsRoverPhotoData[] | null> => {
  const rootUrl = getUrlByRoverType(type);

  return await fetch(
    `${rootUrl}?sol=${sol}&page=${page}&api_key=${process.env.NASA_API}`
  )
    .then((res) => res.json())
    .then((data) => (data as { photos: IMarsRoverPhotoData[] }).photos)
    .catch(() => null);
};
