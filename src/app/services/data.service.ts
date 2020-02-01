import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LocalsFromAutoComplete } from 'src/app/models/localsFromAutoComplete';
import { DailyForecastsRes } from 'src/app/models/DailyForecasts';
import { CurrentWeather } from 'src/app/models/currentWeather';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  endPoint = 'http://dataservice.accuweather.com';
  key: string;

  private favoritesSource = new BehaviorSubject<CurrentWeather[]>([]);
  currentFavorites = this.favoritesSource.asObservable();

  constructor(private http: HttpClient, private cacheService: CacheService) {
    this.getKey();
  }

  getKey(): void {
    if (this.cacheService.isExist('key')) {
      this.key = this.cacheService.getOnEntry('key');
    }
  }

  setFavorites(favorites: CurrentWeather[]): void {
    this.favoritesSource.next(favorites);
  }

  locationAutocomplete(chars: string): Observable<LocalsFromAutoComplete[]> {
    this.getKey();
    return this.http.get<LocalsFromAutoComplete[]>(`${this.endPoint}/locations/v1/cities/autocomplete?apikey=${this.key}&q=${chars}`);
  }

  getCurrentWeather(locationKey: string): Observable<CurrentWeather[]> {
    this.getKey();
    return this.http.get<CurrentWeather[]>(`${this.endPoint}/currentconditions/v1/${locationKey}?apikey=${this.key}`);
  }

  fiveDayDailyForecast(locationKey: string): Observable<DailyForecastsRes> {
    this.getKey();
    return this.http.get<DailyForecastsRes>(`${this.endPoint}/forecasts/v1/daily/5day/${locationKey}?apikey=${this.key}`);
  }
}
