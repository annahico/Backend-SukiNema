import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CinemadetailsComponent } from './cinemadetails.component';

describe('CinemadetailsComponent', () => {
  let component: CinemadetailsComponent;
  let fixture: ComponentFixture<CinemadetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CinemadetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CinemadetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
