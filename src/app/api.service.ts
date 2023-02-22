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
    axios({
      url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${environment.apiKey}`,
      method: "POST", 
      headers: {
        'Content-Type': "application/json"
      }
    }).then(value => {
      return value.data;
    })
    .catch(e => {
      throw e;
    });
  }

  getForecastByCity(city: string) {
    axios({
      url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${environment.apiKey}`,
      method: "POST", 
      headers: {
        'Content-Type': "application/json"
      }
    }).then(value => {
      const coords = value.data.coord;
      axios({
        url: `http://api.openweathermap.org/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lon}&appid=${environment.apiKey} `,
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        }
      }).then(value => {
        return value.data;
      }).catch(e => {
        throw e;
      });
    })
    .catch(e => {
      throw e;
    });
  }
}
