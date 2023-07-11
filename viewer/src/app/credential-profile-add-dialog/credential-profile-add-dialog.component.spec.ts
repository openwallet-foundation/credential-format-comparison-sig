import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CredentialProfileAddDialogComponent } from './credential-profile-add-dialog.component';

describe('CredentialProfileAddDialogComponent', () => {
  let component: CredentialProfileAddDialogComponent;
  let fixture: ComponentFixture<CredentialProfileAddDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CredentialProfileAddDialogComponent]
    });
    fixture = TestBed.createComponent(CredentialProfileAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
