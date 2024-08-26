import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviedeletepopupComponent } from './moviedeletepopup.component';

describe('MoviedeletepopupComponent', () => {
  let component: MoviedeletepopupComponent;
  let fixture: ComponentFixture<MoviedeletepopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoviedeletepopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviedeletepopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
