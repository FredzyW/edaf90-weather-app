import { Component, Input } from '@angular/core';
import { FavoriteCitiesService } from '../favorite-cities.service';

@Component({
  selector: 'app-favorite-cities',
  templateUrl: './favorite-cities.component.html',
  styleUrls: ['./favorite-cities.component.css']
})
export class FavoriteCitiesComponent {
  favoriteCities: string[];

  // ngOnInit() {
  //   this.favoriteCities = JSON.parse(localStorage.getItem('cities') || '');
  //   console.log(this.favoriteCities);
  // }

  constructor(private favoriteCitiesService: FavoriteCitiesService) {
    this.favoriteCities = favoriteCitiesService.getFavoriteCities();
  }
}
