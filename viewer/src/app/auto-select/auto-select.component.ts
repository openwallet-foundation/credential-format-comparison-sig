import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { AppService } from '../app.service';
import { Resources } from '../resources';

export interface Field {
  key: string;
  value: string;
  tooltip: string;
}

@Component({
  selector: 'app-auto-select',
  templateUrl: './auto-select.component.html',
  styleUrls: ['./auto-select.component.scss'],
})
export class AutoSelectComponent implements OnInit {
  @Input() label?: string;

  @Input() resource!: keyof Resources;

  control!: FormControl;

  options: string[] = [];

  filteredOptions!: Observable<string[]>;

  description!: string;

  fields: Field[] = [];

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.control = new FormControl('', [
      Validators.required,
      this.isOfOption(this.appService.getNames(this.resource)),
    ]);

    this.options = this.appService.getNames(this.resource);
    this.description =
      this.appService.getStructure('Credential Profile')[
        this.label ?? this.resource
      ].description;

    this.filteredOptions = this.control.valueChanges.pipe(
      startWith(''),
      map((value: string) => this._filter(value || ''))
    );

    this.control.valueChanges.subscribe((selectedValue) => {
      if (this.control.invalid || selectedValue === null) return;
      const format = this.appService.getFormat(this.resource);
      const values = this.appService.getValues(this.resource);
      this.fields = [];
      Object.keys(values[selectedValue]).forEach((resourceKey) => {
        console.log(resourceKey, selectedValue);
        if (resourceKey === '$schema' || resourceKey === this.resource) return;
        if (typeof values[selectedValue][resourceKey] === 'object') {
          console.log(values[selectedValue][resourceKey]);
        }
        this.fields.push({
          key: resourceKey,
          value: this.appService.getValue(values[selectedValue][resourceKey]),
          tooltip: this.appService.getTooltip(
            format.structure.properties[resourceKey]
          ),
        });
      });
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  /**
   * Checks if the option is one of the defined one. If not an error is returned.
   * @param names
   * @returns
   */
  isOfOption(names: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isSelected = names.includes(control.value);
      return isSelected ? null : { notFound: { value: true } };
    };
  }
}
