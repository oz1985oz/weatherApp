import { Component, OnInit, Input } from '@angular/core';
import { DailyForecast } from 'src/app/models/DailyForecasts';

@Component({
  selector: 'app-day-weather',
  templateUrl: './day-weather.component.html',
  styleUrls: ['./day-weather.component.scss']
})
export class DayWeatherComponent implements OnInit {

  days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  dayName: string;

  _dailyForecast: DailyForecast;
  @Input() set dailyForecast(value: DailyForecast) {    
    this._dailyForecast = value;
    const dayNumber = new Date(value.Date).getDay();
    this.dayName = this.days[dayNumber]
  }


  constructor() { }

  ngOnInit() {
  }

}
