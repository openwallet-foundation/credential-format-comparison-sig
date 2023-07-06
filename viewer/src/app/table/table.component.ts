import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

export interface ColumnHeader {
  header: string;
  tooltip: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, AfterViewInit {
  @Input() data: any;

  @ViewChild(MatSort) sort!: MatSort;
  selectedRowIndex = 2;

  constructor(private route: ActivatedRoute) {
    const resource = this.route.snapshot.paramMap.get('resource');
    if (resource) {
      this.data = (window as any)['structure'][resource];
    }
  }

  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [];
  allColumns: string[] = [];
  columns: ColumnHeader[] = [];

  async ngOnInit(): Promise<void> {
    this.displayedColumns = Object.keys(this.data['structure']) as string[];
    this.allColumns = Object.keys(this.data['structure']) as string[];
    this.columns = Object.keys(this.data['structure']).map((key) => ({
      header: key,
      tooltip: this.data['structure'][key],
    }));
    this.dataSource.data = Object.keys(this.data.values)
      .filter((key) => key !== 'structure')
      .map((key) => this.data.values[key]);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
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
}
