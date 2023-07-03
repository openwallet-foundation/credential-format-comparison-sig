import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CredentialProfileComponent } from './credential-profile.component';

describe('CredentialProfileComponent', () => {
  let component: CredentialProfileComponent;
  let fixture: ComponentFixture<CredentialProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CredentialProfileComponent]
    });
    fixture = TestBed.createComponent(CredentialProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
