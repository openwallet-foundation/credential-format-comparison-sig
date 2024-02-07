import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IProfile, Resources } from '../resources';

@Component({
  selector: 'app-credential-profile-show',
  templateUrl: './credential-profile-show.component.html',
  styleUrl: './credential-profile-show.component.scss',
})
export class CredentialProfileShowComponent implements OnInit {
  profile?: IProfile;
  constructor(
    private route: ActivatedRoute,
    private snachBar: MatSnackBar,
    private router: Router,
    public appService: AppService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.profile = this.appService.getProfile(id) as IProfile;
    if (!this.profile) {
      this.router.navigate(['/']);
      this.snachBar.open(`Profile ${id} not found`, 'Close');
    }
  }

  getElement(key: string) {
    const name = this.profile?.[key as keyof IProfile] as string;
    if (key.includes('Key Management')) {
      key = 'Key Management';
    }
    const values = this.appService.getValues(key as keyof Resources)[name];
    if (!name) return [];
    if (values) {
      return Object.keys(values)
        .filter((key) => key !== '$schema')
        .map((key) => {
          let value = values[key];
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
    return [];
  }
}
