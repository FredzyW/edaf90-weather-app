import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent {
  private _location: string;

  get location() {
    return this._location;
  }

  @Input() set location(val: string) {
    this._location = val;
  }
}
