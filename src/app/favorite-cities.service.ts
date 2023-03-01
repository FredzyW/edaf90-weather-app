import { Injectable, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteCitiesService {

  currentCities: string[];
  currentCities$ = new BehaviorSubject<string[]>([]);

  constructor() {
    this.currentCities = JSON.parse(localStorage.getItem('cities') || '[]')
  }

  getFavoriteCities() : BehaviorSubject<string[]> {
    return this.currentCities$;
  }

  addToFavorites(location: string) : void {
    this.currentCities = JSON.parse(localStorage.getItem('cities') || '[]');
    if (!this.currentCities.includes(location)){
      this.currentCities.push(location)
      this.currentCities$.next(this.currentCities);
    }
    
    localStorage.setItem('cities', JSON.stringify(this.currentCities));
  }

  removeFromFavorites(location: string) : void {
    this.currentCities = JSON.parse(localStorage.getItem('cities') || '[]');
    if (this.currentCities.includes(location)){
      this.currentCities.splice(this.currentCities.indexOf(location), 1);
      this.currentCities$.next(this.currentCities);
    }
    
    localStorage.setItem('cities', JSON.stringify(this.currentCities));
  }
}
