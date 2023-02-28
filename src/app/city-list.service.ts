import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityListService {
  allCities: Observable<ArrayBuffer>;

  constructor(private http: HttpClient) {
    this.http.get("assets/world-cities.csv", {responseType: "text"});
    this.allCities.subscribe(
      data => {
        let rows = data.split("\n");
        return (rows.map((row : string) => row.split(",")[0]));
      }
    )
  }

  getAllCities() {
    return this.allCities;
  }
}
