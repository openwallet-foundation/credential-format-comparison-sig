import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Resources } from '../resources';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  selectionColumns: {
    key: string;
    elements: { value: string; show: string }[];
  }[] = [];

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    for (const key in this.appService.getElements()) {
      if (key === 'Credential Profile') continue;
      const elements: { value: string; show: string }[] = [];
      const subValues = this.appService.getFormat(key as keyof Resources)
        .structure.properties;
      Object.keys(subValues).forEach((value: string) => {
        if (value === '$schema') return;
        elements.push({
          value: `${key} - ${value}`,
          show: value,
        });
      });
      this.selectionColumns.push({
        key,
        elements,
      });
    }
    console.log(this.selectionColumns);
  }
}
