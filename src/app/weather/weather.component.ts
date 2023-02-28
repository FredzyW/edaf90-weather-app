import { Component, Input } from '@angular/core';
import { ApiService } from '../api.service';

type Weather = {
  temp: number,
  feels_like: number,
  temp_max: number,
  temp_min: number,
  weather: {
    description: string,
    icon: string,
    id: number,
    main: string
  },
  wind_speed: number
}

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {
  private _location: string;
  actualTemp: string;
  feelslikeTemp: string;
  windSpeed: string;
  iconSrc: string;
  tallinnWeather: Weather;

  constructor(private apiService: ApiService) {
    this.apiService.getWeatherByCity("Tallinn")
      .then(data => {
        this.tallinnWeather = data as Weather;

        this.actualTemp = this.tallinnWeather.temp.toFixed(2);
        this.feelslikeTemp = this.tallinnWeather.feels_like.toFixed(2);
        this.windSpeed = this.tallinnWeather.wind_speed.toFixed(2);
        this.iconSrc = `http://openweathermap.org/img/wn/${this.tallinnWeather.weather.icon}@2x.png`
        this._location = "Tallinn";
      });
  }

  @Input() set location(val: string) {
    this._location = val;

    this.apiService
      .getWeatherByCity(this._location)
      .then(data => {
        let weather = data as Weather;

        if (!weather) {
          weather = this.tallinnWeather;
          this._location = "Tallinn";
        }

        this.actualTemp = `${weather.temp.toFixed(1)}`;
        this.feelslikeTemp = `${weather.feels_like.toFixed(1)}`;
        this.windSpeed = `${weather.wind_speed.toFixed(1)}`;
        this.iconSrc = `http://openweathermap.org/img/wn/${weather.weather.icon}@2x.png`
      })
      .catch(e => {
        this._location = "";
        console.error(e)
      });
  }

  get location(): string {
    return this._location;
  }
}
