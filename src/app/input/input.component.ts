import { Component,Output, EventEmitter } from '@angular/core';
// import { EventEmitter } from 'rxjs/internal/observable/fromEvent';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  @Output() city = new EventEmitter<string>();
  value = ""
  constructor(public apiService: ApiService) {

  }

  changeCity() {
    console.log(this.value)
    this.city.emit(this.value);
  }
}
