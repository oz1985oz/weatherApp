import { Component, OnInit, Input } from '@angular/core';
import { CurrentWeather } from 'src/app/models/currentWeather';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {

  @Input() favorite: CurrentWeather;

  constructor() { }

  ngOnInit() {
  }

}
