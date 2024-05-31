export enum MediaType {
  Image = 'image',
  IFrame = 'iframe',
}

export interface IAstronomyPictureOfTheDayData {
  title: string;
  url: string;
  explanation: string;
  date: string;
  media_type: MediaType;
}