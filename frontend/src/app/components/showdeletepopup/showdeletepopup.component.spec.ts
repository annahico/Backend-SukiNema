import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowdeletepopupComponent } from './showdeletepopup.component';

describe('ShowdeletepopupComponent', () => {
  let component: ShowdeletepopupComponent;
  let fixture: ComponentFixture<ShowdeletepopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowdeletepopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowdeletepopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
