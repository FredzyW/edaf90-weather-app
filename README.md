# WeatherApp

## Description
 
A weather app that shows the current weather of a city of choice and a 3-day forecast. The user inputs the name of the city to be displayed. The main component is the weather component, which displays the current temperature, humidity, wind speed, and other weather data. Another component is the forecast component, which displays the forecasted temperature for the next three days. The app fetches data from an external server using the [OpenWeather API](https://openweathermap.org/current#name) to get current weather data for the displayed location. We plan to style our page using Angular Material.

We plan to have the components:

- Weather
  - Temperature (actual and "feels like"), humidity, wind speed, and more
- Forecast
  - Displays the temperature and the weather for the coming three days
- Searchbar
  - Includes the form
  - Also displays search suggestions
- Favorite cities’
  - A quick access list to easily display your favorite cities, saved in local storage

![Stucture](/structure.drawio.png)



## Dependencies

```bash
npm install --save @angular/material @angular/cdk @angular/animations
```

## API Keys

Rename `environment.ts.example` to `environment.ts` and fill in your API keys value.

## Usage

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.6.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
