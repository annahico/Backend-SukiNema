import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CinemadeletepopupComponent } from './cinemadeletepopup.component';

describe('CinemadeletepopupComponent', () => {
  let component: CinemadeletepopupComponent;
  let fixture: ComponentFixture<CinemadeletepopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CinemadeletepopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CinemadeletepopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
