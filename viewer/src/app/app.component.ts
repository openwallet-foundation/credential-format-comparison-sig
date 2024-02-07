import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  tabs: string[] = [];

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.appService.getElements();
    this.tabs = Object.keys(this.appService.getElements()).filter(
      (key) => key !== 'Credential Profile' && key !== 'defs'
    );
  }
}
