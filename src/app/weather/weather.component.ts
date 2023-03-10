import { Component, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { FavoriteCitiesService } from '../favorite-cities.service';

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
  currentCitites: string[] | null;

  constructor(private apiService: ApiService, private favoriteCitiesService: FavoriteCitiesService) {
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
    if (!val) {
      this._location = "Tallinn";
    } else {
      this._location = val[0]?.toUpperCase() + val.substring(1)?.toLowerCase();
    }

    this.apiService
      .getWeatherByCity(this._location)
      .then(data => {
        let weather = data as Weather;
        this._location = val[0]?.toUpperCase() + val.substring(1)?.toLowerCase();
        this.actualTemp = `${weather.temp.toFixed(1)}`;
        this.feelslikeTemp = `${weather.feels_like.toFixed(1)}`;
        this.windSpeed = `${weather.wind_speed.toFixed(1)}`;
        this.iconSrc = `http://openweathermap.org/img/wn/${weather.weather.icon}@2x.png`
      })
      .catch(e => {
        this._location = "Tallinn";
        this.actualTemp = `${this.tallinnWeather.temp.toFixed(1)}`;
        this.feelslikeTemp = `${this.tallinnWeather.feels_like.toFixed(1)}`;
        this.windSpeed = `${this.tallinnWeather.wind_speed.toFixed(1)}`;
        this.iconSrc = `http://openweathermap.org/img/wn/${this.tallinnWeather.weather.icon}@2x.png`
        return;
      });
  }

  get location(): string {
    return this._location;
  }

  addToFavorites(location: string): void {
    this.favoriteCitiesService.addToFavorites(location);
  }
}
