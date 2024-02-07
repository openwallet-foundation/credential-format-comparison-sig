import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { Resources } from 'src/app/resources';

@Component({
  selector: 'app-resources-show',
  templateUrl: './resources-show.component.html',
  styleUrl: './resources-show.component.scss',
})
export class ResourcesShowComponent implements OnInit {
  values: { type: string; key: string; value: any }[] = [];
  resource!: string;
  res?: any;
  constructor(
    private route: ActivatedRoute,
    private snachBar: MatSnackBar,
    private router: Router,
    public appService: AppService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.resource = this.route.snapshot.paramMap.get('resource') as string;
    this.res = this.appService.getValues(this.resource as keyof Resources)?.[
      id
    ];
    if (!this.res) {
      this.router.navigate(['/']);
      this.snachBar.open(`Resource ${id} not found`, 'Close');
    }
    this.values = Object.keys(this.res)
      .filter((key) => key !== '$schema')
      .map((key) => {
        let value = this.res[key];
        let type = 'text';
        if (typeof value === 'string' && value.startsWith('http')) {
          type = 'link';
        } else if (Array.isArray(value)) {
          value = value.join(', ');
        } else if (typeof value === 'object') {
          value = `${value.Value} (${value.Description})`;
        }
        return {
          type,
          key,
          value,
        };
      });
  }
}
