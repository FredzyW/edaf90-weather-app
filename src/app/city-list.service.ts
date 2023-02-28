import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CityListService {
  allCities: string[];

  constructor(private http: HttpClient) {
    this.allCities = [];
    (this.http.get("assets/world-cities.csv", {responseType: "text"})
    .subscribe(
      data => {
        let rows = data.split("\n");
        (rows.map(row => this.allCities.push(`${row.split(",")[0]}, ${row.split(",")[1]}`)));
      }
    ))
  }

  getAllCities() {
    return this.allCities;
  }
}
