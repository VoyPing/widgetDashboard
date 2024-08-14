export interface TextWidgetSettings {
    text: string;
  }
  
  export interface WeatherWidgetSettings {
    latitude: number;
    longitude: number;
  }
  
  export type WidgetSettings = TextWidgetSettings | WeatherWidgetSettings;
  