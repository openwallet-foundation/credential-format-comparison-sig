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
@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    CredentialProfileComponent,
    ResourcesComponent,
    FormatPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
  ],
  providers: [FormatPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
