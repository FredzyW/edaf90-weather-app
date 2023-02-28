import { Component } from '@angular/core';
import { ApiService } from './api.service';
// import 'all-the-cities' from 

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
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'weather-app';
  
  currentCity: Weather|void; 
  constructor(public apiService: ApiService) {
 
  }

  onChange(city: string) {
    this.apiService.getWeatherByCity(city).then(value => this.currentCity = value).then(value => console.log(this.currentCity))
  }
}
