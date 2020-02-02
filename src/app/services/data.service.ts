import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LocalsFromAutoComplete } from 'src/app/models/localsFromAutoComplete';
import { DailyForecastsRes } from 'src/app/models/DailyForecasts';
import { CurrentWeather } from 'src/app/models/currentWeather';
import { CacheService } from './cache.service';
import { SelectedArea } from '../models/selectedArea';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  key: string;

  private favoritesSource = new BehaviorSubject<CurrentWeather[]>([]);
  currentFavorites = this.favoritesSource.asObservable();

  private selectedSource = new BehaviorSubject<SelectedArea>(new SelectedArea('215854', 'Tel Aviv'));
  currentSelected = this.selectedSource.asObservable();

  constructor(private http: HttpClient, private cacheService: CacheService) {
    this.getKey();
  }

  getKey(): void {
    if (this.cacheService.isExist('key')) {
      this.key = this.cacheService.getOnEntry('key');
    }
  }

  setSelected(selected: SelectedArea): void {
    this.selectedSource.next(selected);
  }

  setFavorites(favorites: CurrentWeather[]): void {
    this.favoritesSource.next(favorites);
  }

  locationAutocomplete(chars: string): Observable<LocalsFromAutoComplete[]> {
    this.getKey();
    // tslint:disable-next-line: max-line-length
    return this.http.get<LocalsFromAutoComplete[]>(`${environment.endPoint}/locations/v1/cities/autocomplete?apikey=${this.key}&q=${chars}`);
  }

  getCurrentWeather(locationKey: string): Observable<CurrentWeather[]> {
    this.getKey();
    return this.http.get<CurrentWeather[]>(`${environment.endPoint}/currentconditions/v1/${locationKey}?apikey=${this.key}`);
  }

  fiveDayDailyForecast(locationKey: string): Observable<DailyForecastsRes> {
    this.getKey();
    return this.http.get<DailyForecastsRes>(`${environment.endPoint}/forecasts/v1/daily/5day/${locationKey}?apikey=${this.key}`);
  }
}
