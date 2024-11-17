import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovedComponent } from './moved.component';

describe('MovedComponent', () => {
  let component: MovedComponent;
  let fixture: ComponentFixture<MovedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
