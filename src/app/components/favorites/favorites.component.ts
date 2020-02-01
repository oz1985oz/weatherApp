import { Component, OnInit, OnDestroy } from '@angular/core';
import { CurrentWeather } from 'src/app/models/currentWeather';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit, OnDestroy {

  favorites: CurrentWeather[];
  sub: any;

  constructor(public dataService: DataService) { }

  ngOnInit() {
    this.sub = this.dataService.currentFavorites.subscribe(data => {
      this.favorites = data;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
