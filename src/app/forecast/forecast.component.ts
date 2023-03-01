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
  wind_speed: number,
  date: string
}

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent {
  private _location: string;
  forecast: Weather[]

  constructor(private apiService: ApiService) { }

  get location() {
    return this._location;
  }

  @Input() set location(val: string) {
    this._location = val;

    this.apiService
      .getForecastByCity(this._location)
      .then(data => {
        this.forecast = data as Weather[];
      })
      .catch(e => console.error(e));
  }

  getImageLink(icon: string) {
    return `http://openweathermap.org/img/wn/${icon}@2x.png`;
  }
}
