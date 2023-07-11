import { Component, Inject, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Resources } from '../resources';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface Filter {
  [key: string]: { [key: string]: boolean };
}
interface FilterElement {
  value: string;
  show: string;
  type: string | string[];
  tooltip: string;
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  selectionColumns: {
    key: string;
    elements: FilterElement[];
  }[] = [];
  public form!: FormGroup;

  constructor(
    private appService: AppService,
    public dialogRef: MatDialogRef<FilterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Filter
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({});
    for (const key of this.appService.extraValues) {
      const group = new FormGroup({});
      if (key === 'Credential Profile') continue;
      const elements: FilterElement[] = [];
      const subValues = this.appService.getFormat(this.appService.getKey(key))
        .structure.properties;
      Object.keys(subValues).forEach((value: string) => {
        if (value === '$schema') return;
        elements.push({
          value: `${key} - ${value}`,
          show: value,
          type: subValues[value].type,
          tooltip: subValues[value].description,
        });
        if (this.isCheckbox(elements[elements.length - 1])) {
          group.addControl(value, new FormControl());
        }
      });
      this.selectionColumns.push({
        key,
        elements,
      });
      this.form.addControl(key, group);
    }
    this.form.patchValue(this.data);
  }

  isCheckbox(element: FilterElement) {
    return element.type === 'boolean' || element.type.includes('boolean');
  }

  getOptions(element: FilterElement): any {
    return [];
  }

  filter() {
    this.dialogRef.close(this.form.value);
  }
}
