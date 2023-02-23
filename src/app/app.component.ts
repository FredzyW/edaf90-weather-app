import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'weather-app';
  constructor(public apiService: ApiService) {
 
  }

  onChange(city: string) {
    console.log(city)
    this.apiService.getWeatherByCity(city).then(value => console.log(value))
  }
}
