import { Component,Output, EventEmitter } from '@angular/core';
// import { EventEmitter } from 'rxjs/internal/observable/fromEvent';
// declare function require(name: string): any;
import { ApiService } from '../api.service';
// import * as cities from "../../../node_modules/@types/all-the-cities";
// import * as cities from "all-the-cities";
import { HttpClient } from '@angular/common/http';
import { CityListService } from '../city-list.service';
// const cities = require('all-the-cities');
import {Observable, of} from 'rxjs';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  @Output() city = new EventEmitter<string>();
  value = ""
  allCities: Observable<ArrayBuffer>;
  constructor(public apiService: ApiService, private cityListService: CityListService) {
    if(this.cityListService.getAllCities()) {
      this.allCities = cityListService.getAllCities();
    } else {
      this.allCities = of(new ArrayBuffer(0));
    }
  }

  changeCity() {
    this.city.emit(this.value);
  }
}
