declare module 'react-open-weather' {
  import { FC } from 'react';

  export const useOpenWeather: (props: {
    key: string;
    lat: string;
    lon: string;
    lang: string;
    unit: string;
  }) => {
    data: any;
    isLoading: boolean;
    errorMessage: string;
  };

  interface ReactWeatherProps {
    isLoading: boolean;
    errorMessage: string;
    data: any;
    lang: string;
    locationLabel: string;
    unitsLabels: { temperature: string; windSpeed: string };
    showForecast: boolean;
    theme?: object;
  }

  // Treat ReactWeather as any for now
  export const ReactWeather: any;
}
