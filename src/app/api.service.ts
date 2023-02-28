import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'environment';

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
type ForecastResponse = {
  dt: number,
  dt_txt: string,
  main: {
    feels_like: number,
    grnd_level: number,
    humidity: number,
    pressure: number,
    sea_level: number,
    temp: number,
    temp_kf: number,
    temp_max: number,
    temp_min: number
  },
  pop: number,
  visibility: number,
  weather: [
    {
      description: string,
      icon: string,
      id: number,
      main: string
    }
  ],
  wind: {
    deg: number,
    gust: number,
    speed: number
  }
}


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor() { }

  ngOnInit() {
  }

  getWeatherByCity(city: string): Promise<Weather|void> {
    return axios({
      url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${environment.apiKey}`,
      method: "POST", 
      headers: {
        'Content-Type': "application/json"
      }
    }).then(response => {
      const data = response.data;
      const output: Weather = {
          temp: this.kelvinToCelsius(data.main.temp),
          feels_like: this.kelvinToCelsius(data.main.feels_like),
          temp_min: this.kelvinToCelsius(data.main.temp_min),
          temp_max: this.kelvinToCelsius(data.main.temp_max),
          weather: data.weather[0]
      }
      return output;
    })
    .catch(e => {
      // throw e;
      console.error(e);
    });
  }

  kelvinToCelsius(degrees: number) {
    return (degrees-273.15);
  }

  isTwelveOClock(time: string) {
    return time.includes("12:00:00") ? true : false;
  }

  getForecastByCity(city: string) {
    return axios({
      url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${environment.apiKey}`,
      method: "POST", 
      headers: {
        'Content-Type': "application/json"
      }
    }).then(value => {
      const coords = value.data?.coord;
      axios({
        url: `http://api.openweathermap.org/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lon}&appid=${environment.apiKey} `,
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        }
      }).then(response => {
        // console.log(
        return (
        response.data?.list
        ?.map((value: ForecastResponse) => value)
        .filter((value: ForecastResponse) => this.isTwelveOClock(value?.['dt_txt']))
        .map((value: ForecastResponse) => ({
          temp: this.kelvinToCelsius(value.main.temp),
          feels_like: this.kelvinToCelsius(value.main.feels_like),
          temp_min: this.kelvinToCelsius(value.main.temp_min),
          temp_max: this.kelvinToCelsius(value.main.temp_max),
          weather: value.weather[0]
        }))
        )
      }).catch(e => {
        throw e;
      });
    })
    .catch(e => {
      console.error(e);
    });
  }
}
