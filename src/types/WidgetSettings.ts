export interface TextWidgetSettings {
    text: string;
  }
  
  export interface WeatherWidgetSettings {
    latitude: number;
    longitude: number;
    position: { x: number; y: number };
  }
  
  export type WidgetSettings = TextWidgetSettings | WeatherWidgetSettings;
  