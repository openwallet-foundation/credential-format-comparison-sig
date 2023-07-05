import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-credential-profile',
  templateUrl: './credential-profile.component.html',
  styleUrls: ['./credential-profile.component.scss'],
})
export class CredentialProfileComponent implements OnInit, AfterViewInit {
  data: any;
  allColumns: string[] = [];
  displayedColumns: string[] = [];
  columns: any[] = [];
  dataSource: any;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<any>();
    this.data = (window as any)['structure']['Credential Profile'];
    this.allColumns = this.data.structure;
    // get the keys of the first object in the data array
    // also add the columns from the objects
    // Object.keys((window as any)['structure'])
    //   .filter((key) => key !== 'Credential Profile')
    //   .forEach((key) => {
    //     const subValues = (window as any)['structure'][key]['structure'];
    //     Object.keys(subValues).forEach((value: any) =>
    //       this.allColumns.push(`${key} - ${value}`)
    //     );
    //   });

    this.displayedColumns = JSON.parse(JSON.stringify(this.allColumns));
    this.columns = this.allColumns.map((key) => ({
      header: key,
    }));
    const keys = Object.keys((window as any)['structure']).filter(
      (value) => value !== 'Credential Profile'
    );
    this.dataSource.data = Object.values(this.data.values).map((value: any) => {
      // Object.keys(value)
      //   .filter((value) => keys.includes(value))
      //   .forEach((key) => {
      //     console.log(this.getSubResources(key, value[key]));
      //   });
      return value;
    });
  }

  getSubResources(key: string, subKey: string) {
    return (window as any)['structure'][key]['values'][subKey];
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  hasLink(value: string, header: string) {
    if (header.startsWith('Key Management')) header = 'Key Management';
    return (window as any)['structure'][header]?.values[value];
  }

  getLink(values: string[]) {
    return values.map((value) =>
      value.startsWith('Key Management') ? 'Key Management' : value
    );
  }
}
