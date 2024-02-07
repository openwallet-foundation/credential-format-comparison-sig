import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CredentialProfileListComponent } from './credential-profile/credential-profile-list/credential-profile-list.component';
import { ResourcesListComponent } from './resources/resources-list/resources-list.component';
import { ProfileConfigComponent } from './profile-config/profile-config.component';
import { CredentialProfileShowComponent } from './credential-profile/credential-profile-show/credential-profile-show.component';
import { DefinitionComponent } from './definition/definition.component';
import { ResourcesShowComponent } from './resources/resources-show/resources-show.component';

const routes: Routes = [
  {
    path: '',
    component: CredentialProfileListComponent,
  },
  {
    path: 'config',
    component: ProfileConfigComponent,
  },
  {
    path: 'profiles/:id',
    component: CredentialProfileShowComponent,
  },
  {
    path: 'resources/:resource',
    component: ResourcesListComponent,
  },
  {
    path: 'resources/:resource/:id',
    component: ResourcesShowComponent,
  },
  {
    path: 'definition',
    component: DefinitionComponent,
  },
  {
    path: 'definition/:resource',
    component: DefinitionComponent,
  },
  {
    path: 'definition/:resource/:id',
    component: DefinitionComponent,
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
