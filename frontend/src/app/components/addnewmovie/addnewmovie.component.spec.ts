import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewmovieComponent } from './addnewmovie.component';

describe('AddnewmovieComponent', () => {
  let component: AddnewmovieComponent;
  let fixture: ComponentFixture<AddnewmovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddnewmovieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddnewmovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
