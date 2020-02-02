import { Component, Input } from '@angular/core';
import { CurrentWeather } from 'src/app/models/currentWeather';
import { DataService } from 'src/app/services/data.service';
import { SelectedArea } from 'src/app/models/selectedArea';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent {

  @Input() favorite: CurrentWeather;

  constructor(
    public dataService: DataService,
    public router: Router,
  ) { }

  goToHomePageFavorite(): void {
    const select = new SelectedArea(this.favorite.locationId, this.favorite.locationName)
    this.dataService.setSelected(select);
    this.router.navigate(['/home']);
  }
}
