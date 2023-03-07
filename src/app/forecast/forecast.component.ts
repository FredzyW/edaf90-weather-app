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
  date: string,
  time: string
}

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent {
  private _location: string;
  forecast: Weather[]
  detailedForecast: Weather[]
  details: boolean;

  constructor(private apiService: ApiService) { }

  get location() {
    return this._location;
  }

  @Input() set location(val: string) {
    this._location = val;
    this.details = false;
    

    this.apiService
      .getForecastByCity(this._location)
      .then(data => {
        this.detailedForecast = data as Weather[];
        this.forecast = this.detailedForecast.filter(weather => this.apiService.isTwelveOClock(weather.time))
      })
      .catch(e => {
        this._location = "Tallinn";
        this.apiService
          .getForecastByCity(this._location)
          .then(data => {
            this.detailedForecast = data as Weather[];
            this.forecast = this.detailedForecast.filter(weather => this.apiService.isTwelveOClock(weather.time))
          })
      })
  }

  getImageLink(icon: string) {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  }

  showDetails() {
    this.details = !this.details;
  }
}
