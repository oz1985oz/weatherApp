import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AutoComplete } from 'src/app/models/autoComplete';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  endPoint = 'http://dataservice.accuweather.com';
  key = 'q8ZABgDGKA8anHKYGg5vLUbODGxGzY9F';

  constructor(private http: HttpClient) { }

  locationAutocomplete(chars: string): Observable<AutoComplete[]> {
    return this.http.get<AutoComplete[]>(`${this.endPoint}/locations/v1/cities/autocomplete?apikey=${this.key}&q=${chars}`);
  }

  getCurrentWeather(locationKey: string): Observable<any> {
    return this.http.get<any>(`${this.endPoint}/currentconditions/v1/${locationKey}?apikey=${this.key}`);
  }

  fiveDayDailyForecast(locationKey: string): Observable<any> {
    return this.http.get<any>(`${this.endPoint}/forecasts/v1/daily/5day/${locationKey}?apikey=${this.key}`);
  }
}
