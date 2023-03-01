import { Component, Input } from '@angular/core';
import { FavoriteCitiesService } from '../favorite-cities.service';
import { BehaviorSubject } from 'rxjs';

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
    favoriteCitiesService.getFavoriteCities().subscribe(
      updatedCities => {
        this.favoriteCities = updatedCities;
      }
    );
    this.favoriteCities = JSON.parse(localStorage.getItem('cities') || '[]')
    // this.favoriteCities = favoriteCitiesService.getFavoriteCities().getValue();
  }
}
