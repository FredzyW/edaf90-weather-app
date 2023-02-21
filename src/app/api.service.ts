import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiKey: string|undefined;

  constructor() { }

  ngOnInit() {
    // console.log('init');
    this.apiKey = environment.apiKey;
  }

  getWeatherByCity(city: string) {
    // console.log(environment.apiKey)
    axios({
      url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${environment.apiKey}`,
      method: "POST", 
      headers: {
        'Content-Type': "application/json"
      }
    }).then(value => {
      console.log(value.data)
      return value.data;
    })
    .catch(e => {
      throw e;
    });
  }

  getForecastByCity(city: string) {
    retu
  }
}
