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
  selector: 'app-favorite-city-card',
  templateUrl: './favorite-city-card.component.html',
  styleUrls: ['./favorite-city-card.component.css']
})
export class FavoriteCityCardComponent {
  private _location: string;
  actualTemp: string;
  feelslikeTemp: string;
  windSpeed: string;
  iconSrc: string;
  tallinnWeather: Weather;
  currentCitites: string[] | null;

  constructor(private apiService: ApiService, private favoriteCitiesService: FavoriteCitiesService) {
    
  }

  @Input() set location(val: string) {
    this._location = val;
    this.apiService
      .getWeatherByCity(this._location)
      .then(data => {
        let weather = data as Weather;
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

  removeFromFavorites(location: string) : void {
    this.favoriteCitiesService.removeFromFavorites(location);
  }
}
