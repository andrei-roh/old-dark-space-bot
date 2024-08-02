export const enum MediaType {
  Image = 'image',
  IFrame = 'iframe',
}

export const enum RoverType {
  Spirit = 'spirit',
  Opportunity = 'opportunity',
  Curiosity = 'curiosity',
  Perseverance = 'perseverance',
}

export interface IAstronomyPictureOfTheDayData {
  title: string;
  url: string;
  explanation: string;
  date: string;
  media_type: MediaType;
}

interface ICamera {
  id: number;
  name: string;
  full_name: string;
  rover_id: number;
}

export interface IMarsRoverPhotoData {
  id: number;
  sol: number;
  img_src: string;
  earth_date: string;
  camera: ICamera;
  rover: {
    id: number;
    name: string;
    landing_date: string;
    launch_date: string;
    status: string;
    max_sol: number;
    max_date: string;
    total_photos: number;
    cameras: Pick<ICamera, 'name' | 'full_name'>[];
  };
}

export interface IState {
  type: RoverType;
  isWaitingSolAndPage: boolean;
}
