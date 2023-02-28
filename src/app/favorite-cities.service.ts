import { Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoriteCitiesService {

  currentCities: string[];

  constructor() {
    this.currentCities = JSON.parse(localStorage.getItem('cities') || '[]')
  }

  getFavoriteCities() : string[] {
    return this.currentCities;
  }

  addToFavorites(location: string) : void {
    this.currentCities = JSON.parse(localStorage.getItem('cities') || '[]');
    if (!this.currentCities.includes(location)){
      this.currentCities.push(location)
    }
    
    localStorage.setItem('cities', JSON.stringify(this.currentCities));
  }

  removeFromFavorites(location: string) : void {
    this.currentCities = JSON.parse(localStorage.getItem('cities') || '[]');
    if (this.currentCities.includes(location)){
      this.currentCities.splice(this.currentCities.indexOf(location), 1);
    }
    
    localStorage.setItem('cities', JSON.stringify(this.currentCities));
  }
}
