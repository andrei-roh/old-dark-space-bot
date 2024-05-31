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

export interface ISolData {
  sol_hours_with_data: number[];
  valid: boolean;
}

export interface IMarsWeather {
  sol_keys: number[];
  validity_checks: {
      number: {
          AT: ISolData,
          HWS: ISolData,
          PRE: ISolData,
          WD: ISolData, 
      }
      sol_hours_required: number;
      sols_checked: string[];
  }
}