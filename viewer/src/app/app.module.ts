import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { TableComponent } from './table/table.component';
import { MatSortModule } from '@angular/material/sort';
import { CredentialProfileComponent } from './credential-profile/credential-profile.component';
import { AppRoutingModule } from './app-routing.module';
import { ResourcesComponent } from './resources/resources.component';
import { FormatPipe } from './format.pipe';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { CredentialProfileAddDialogComponent } from './credential-profile-add-dialog/credential-profile-add-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AutoSelectComponent } from './auto-select/auto-select.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldDefaultOptions,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { FilterComponent } from './filter/filter.component';

const appearance: MatFormFieldDefaultOptions = {
  appearance: 'outline',
};
@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    CredentialProfileComponent,
    ResourcesComponent,
    FormatPipe,
    CredentialProfileAddDialogComponent,
    AutoSelectComponent,
    FilterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    FlexLayoutModule,
    AppRoutingModule,
    MatToolbarModule,
    MatTableModule,
    HttpClientModule,
    MatTooltipModule,
    MatSelectModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatSortModule,
    MatListModule,
    MatCheckboxModule,
    MatChipsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    ClipboardModule,
  ],
  providers: [
    FormatPipe,
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: appearance,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
