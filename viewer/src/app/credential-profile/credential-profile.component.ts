import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CredentialProfileAddDialogComponent } from '../credential-profile-add-dialog/credential-profile-add-dialog.component';
import { AppService } from '../app.service';
import { Format, Property, Resources } from '../resources';
import { Filter, FilterComponent } from '../filter/filter.component';
import { MatPaginator } from '@angular/material/paginator';

class ColumnHeader {
  key!: string;
  tooltip!: string;
}

@Component({
  selector: 'app-credential-profile',
  templateUrl: './credential-profile.component.html',
  styleUrls: ['./credential-profile.component.scss'],
})
export class CredentialProfileComponent implements OnInit, AfterViewInit {
  data!: Format;
  allColumns: ColumnHeader[] = [];
  displayedColumns: string[] = [];
  columns: ColumnHeader[] = [];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatSort) sort!: MatSort;
  selectionColumns: {
    key: string;
    elements: { value: string; show: string }[];
  }[] = [];

  filter: Filter = {};

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dialog: MatDialog, public appService: AppService) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<any>();
    this.data = this.appService.getFormat('Credential Profile');
    this.allColumns = [];

    Object.keys(this.data.structure.properties).forEach((value: string) => {
      if (value === '$schema') return;
      this.allColumns.push({
        key: value,
        tooltip: (this.data.structure.properties[value] as Property)
          .description,
      });
    });
    for (const key of this.appService.extraValues) {
      const elements: { value: string; show: string }[] = [];

      const subValues = this.appService.getFormat(this.appService.getKey(key))
        .structure.properties;
      Object.keys(subValues)
        .filter((value) => value !== '$schema')
        .forEach((value: string) => {
          this.allColumns.push({
            key: `${key} - ${value}`,
            tooltip:
              (subValues[value] as Property).description ??
              subValues[value].allOf[1].description,
          });
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

    this.displayedColumns = this.allColumns.map((value) => value.key);
    this.columns = this.allColumns;

    this.addData();
  }

  private addData() {
    this.dataSource.data = Object.values(this.data.values)
      .map((value: any) => {
        Object.keys(value)
          .filter((value) => this.appService.extraValues.includes(value))
          .forEach((key) => {
            const subValues = this.appService.getValues(
              this.appService.getKey(key)
            )[value[key]];
            if (subValues) {
              Object.keys(subValues)
                .filter((subKey) => subKey !== '$schema')
                .forEach((subKey) => {
                  value[`${key} - ${subKey}`] = subValues[subKey];
                });
            }
          });
        return value;
      })
      // filter out the columns that do not match with the filter
      .filter((value) => {
        for (const category in this.filter) {
          for (const key in this.filter[category]) {
            if (this.filter[category][key]) {
              const res = value[`${category} - ${key}`];
              return typeof res === 'object' ? res.Value : res;
            }
          }
        }
        return true;
      });
  }

  getFilterValues() {
    const elements = [];
    for (const category in this.filter) {
      for (const key in this.filter[category]) {
        if (this.filter[category][key]) {
          elements.push(`${category} - ${key}`);
        }
      }
    }
    return elements;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  isSticky(column: ColumnHeader) {
    return column.key === 'Credential Profile is commonly called';
  }

  hasLink(value: string, header: string) {
    if (!value || typeof value !== 'string') return;
    if (header.startsWith('Key Management')) header = 'Key Management';
    return this.appService.getFormat(header as keyof Resources)?.values[value];
  }

  getLink(values: string[]) {
    return values.map((value) => this.appService.getKey(value));
  }

  addProfile() {
    this.dialog.open(CredentialProfileAddDialogComponent, {
      disableClose: true,
      minWidth: '500px',
    });
  }

  openFilter() {
    this.dialog
      .open(FilterComponent, {
        disableClose: true,
        minWidth: '500px',
        data: this.filter,
      })
      .afterClosed()
      .subscribe((value) => {
        if (!value) return;
        this.filter = value;
        this.addData();
      });
  }

  elementType(value: any, header: string) {
    if (typeof value === 'undefined') return 'undefined';
    if (typeof value === 'boolean') return 'icon';
    if (typeof value.Value !== 'undefined') return 'icon-tooltip';
    return this.hasLink(value, header) ? 'link' : 'text';
  }
}
