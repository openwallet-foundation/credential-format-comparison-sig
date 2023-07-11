import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Resources } from '../resources';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss'],
})
export class ResourcesComponent implements OnInit {
  tabs!: string[];
  data!: Resources;

  constructor(private appService: AppService) {}

  async ngOnInit(): Promise<void> {
    this.data = this.appService.getElements();
    this.tabs = Object.keys(this.data).filter(
      (key) => key !== 'Credential Profile'
    );
  }
}
