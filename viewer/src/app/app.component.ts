import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { MatDialog } from '@angular/material/dialog';
import { MovedComponent } from './moved/moved.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  tabs: string[] = [];

  constructor(private appService: AppService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.appService.getElements();

    this.dialog.open(MovedComponent);

    this.tabs = Object.keys(this.appService.getElements()).filter(
      (key) => key !== 'Credential Profile' && key !== 'defs'
    );
  }
}
