import { Component,Output, EventEmitter } from '@angular/core';
import {FormControl} from "@angular/forms"
import { ApiService } from '../api.service';
import { CityListService } from '../city-list.service';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  myControl = new FormControl('');
  @Output() city = new EventEmitter<string>();
  value = ""
  allCities: string[];
  filteredCities: Observable<string[]>;

  ngOnInit() {
    this.filteredCities = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    if(value.length >= 2) {
      const filterValue = value.toLowerCase();
      return this.allCities.filter(option => option.toLowerCase().startsWith(filterValue));
    } else {
      return [];
    }
  }

  constructor(public apiService: ApiService, public cityListService: CityListService) {
    this.allCities = cityListService.getAllCities();
  }

  changeCity() {
    this.city.emit(this.value.split(",")[0]);
  }
}
