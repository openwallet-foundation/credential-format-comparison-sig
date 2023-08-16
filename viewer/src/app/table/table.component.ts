import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';
import { Format, Resources } from '../resources';
import { MatPaginator } from '@angular/material/paginator';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';

export interface ColumnHeader {
  header: string;
  tooltip: string;
}

type Res = keyof Resources;

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, AfterViewInit {
  @Input() data!: Format;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;
  selectedRowIndex = 2;

  constructor(
    private route: ActivatedRoute,
    private appService: AppService,
    private router: Router
  ) {
    const resource: Res = this.route.snapshot.paramMap.get('resource') as Res;
    if (resource) {
      this.data = this.appService.getFormat(resource);
    }
    this.route.params.subscribe((params) => {
      this.data = this.appService.getFormat(params['resource'] as Res);
      this.ngOnInit();
      this.ngAfterViewInit();
    });
  }

  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [];

  allColumns: string[] = [];
  columns: ColumnHeader[] = [];
  rowCtrl = new FormControl('');
  filteredRows!: Observable<string[]>;
  @ViewChild('rowInput') rowInput!: ElementRef<HTMLInputElement>;

  async ngOnInit(): Promise<void> {
    this.displayedColumns = this.getNames();
    this.allColumns = this.getNames();
    this.columns = this.getNames().map((key) => ({
      header: key,
      tooltip: this.appService.getTooltip(this.data.structure.properties[key]),
    }));
    this.dataSource.data = Object.keys(this.data.values)
      .filter((key) => key !== 'structure')
      .map((key) => this.data.values[key]);

    this.filteredRows = this.rowCtrl.valueChanges.pipe(
      startWith(null),
      map((row: string | null) =>
        row
          ? this._filter(row)
          : this.allColumns
              .slice()
              .filter((row) => this.displayedColumns.indexOf(row) < 0)
      )
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  private getNames(): string[] {
    return Object.keys(this.data.structure.properties).filter(
      (key) => key !== '$schema'
    );
  }

  jumpTo() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const rectRow = document
        .getElementById('jumpto')
        ?.getBoundingClientRect();
      const table = document.getElementById('table');
      const rectTable = table?.getBoundingClientRect();
      if (rectRow && table && rectTable) {
        table.scrollTo({
          left: 0,
          top: rectRow?.y - rectTable?.y,
          behavior: 'smooth',
        });
      }
    }
  }

  isSelected(row: any) {
    const id = this.route.snapshot.paramMap.get('id');
    const resource = this.route.snapshot.paramMap.get('resource');
    if (!id || !resource) return false;
    return row[resource] === id;
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.displayedColumns.push(event.option.viewValue);
    this.rowInput.nativeElement.value = '';
    this.rowCtrl.setValue(null);
  }

  remove(value: string) {
    this.displayedColumns = this.displayedColumns.filter(
      (row) => row !== value
    );
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our row
    if (value) {
      this.displayedColumns.push(value);
    }

    // Clear the input value
    event.chipInput.clear();

    this.rowCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allColumns
      .filter((row) => row.toLowerCase().includes(filterValue))
      .filter((row) => this.displayedColumns.indexOf(row) < 0);
  }

  elementType(value: any) {
    if (typeof value === 'undefined') return 'undefined';
    if (typeof value === 'boolean') return 'icon';
    if (typeof value.Value !== 'undefined') return 'icon-tooltip';
    return '';
  }
}
