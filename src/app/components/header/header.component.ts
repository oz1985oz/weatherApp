import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  sub: any;
  countFavorites: number;

  constructor(public dataService: DataService) { }

  ngOnInit() {
    this.dataService.currentFavorites.subscribe(data => {
      this.countFavorites = data.length;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
