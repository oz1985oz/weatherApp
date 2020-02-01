import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { FormControl } from '@angular/forms';
import { LocalsFromAutoComplete } from 'src/app/models/localsFromAutoComplete';
import { debounceTime } from 'rxjs/operators';
import { DailyForecast, Headline } from 'src/app/models/DailyForecasts';
import { CurrentWeather } from 'src/app/models/currentWeather';
import { ActivatedRoute } from '@angular/router';
import { CacheService } from 'src/app/services/cache.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  subs: any[] = [];
  // Tel aviv as a default
  selectedAreaKey = '215854';
  selectedAreaName = 'Tel Aviv';
  currentWeather: CurrentWeather;
  favorites: CurrentWeather[];
  isFavorite: boolean;

  searchControl = new FormControl();
  areasRes: LocalsFromAutoComplete[];
  dailyForecasts: DailyForecast[];
  headline: string;

  constructor(
    public dataService: DataService,
    public cacheService: CacheService,
    public route: ActivatedRoute,
  ) {
    const key = this.route.snapshot.paramMap.get('key');
    if (key) {
      this.cacheService.setEntry('key', key);
    }
    const sub = this.searchControl.valueChanges.pipe(
      debounceTime(400))
    .subscribe(chars => {
      this.dataService.locationAutocomplete(chars).subscribe(res => this.areasRes = res);
    });
    this.subs.push(sub);
  }

  addToFavorites(): void {
    this.favorites.push(this.currentWeather);
    this.dataService.setFavorites(this.favorites);
  }

  removeFromFavorites(): void {
    const i = this.favorites.findIndex(fav => fav.locationId === this.selectedAreaKey);
    if (i >= 0) {
      this.favorites.splice(i, 1);
      this.dataService.setFavorites(this.favorites);
    }
  }

  onSelectionChanged(e): void {
    this.selectedAreaKey = e.option.value.Key;
    this.selectedAreaName = e.option.value.LocalizedName;
    this.searchControl.setValue(e.option.value.LocalizedName);
    this.initFiveDayDailyForecast();
  }

  initFiveDayDailyForecast(): void {
    const sub1 = this.dataService.fiveDayDailyForecast(this.selectedAreaKey).subscribe(res => {
      this.dailyForecasts = res.DailyForecasts;
      this.headline = res.Headline.Text;
    });
    const sub2 = this.dataService.getCurrentWeather(this.selectedAreaKey).subscribe(res => {
      this.currentWeather = new CurrentWeather(res[0], this.selectedAreaKey, this.selectedAreaName);
      this.isInFavorite();
    });
    this.subs.push(sub1, sub2);
  }

  isInFavorite(): void {
    this.isFavorite = this.favorites.some(fav => fav.locationId === this.selectedAreaKey);
  }

  ngOnInit() {
    this.initFiveDayDailyForecast();
    const sub = this.dataService.currentFavorites.subscribe(data => {
      this.favorites = data;
      this.isInFavorite();
    });
    this.subs.push(sub);
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
