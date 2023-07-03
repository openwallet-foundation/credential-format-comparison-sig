import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss'],
})
export class ResourcesComponent {
  tabs?: string[];
  data: any;

  constructor(private router: Router) {}

  async ngOnInit(): Promise<void> {
    this.data = (window as any)['structure'];
    this.tabs = Object.keys(this.data).filter(
      (key) => key !== 'Credential Profile'
    );
  }
}
