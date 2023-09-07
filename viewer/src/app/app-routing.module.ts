import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CredentialProfileComponent } from './credential-profile/credential-profile.component';
import { TableComponent } from './table/table.component';
import { ProfileConfigComponent } from './profile-config/profile-config.component';

const routes: Routes = [
  {
    path: '',
    component: CredentialProfileComponent,
  },
  {
    path: 'config',
    component: ProfileConfigComponent,
  },
  {
    path: 'resources/:resource',
    component: TableComponent,
  },
  {
    path: 'resources/:resource/:id',
    component: TableComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
