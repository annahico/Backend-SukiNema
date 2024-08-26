import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewcinemaComponent } from './addnewcinema.component';

describe('AddnewcinemaComponent', () => {
  let component: AddnewcinemaComponent;
  let fixture: ComponentFixture<AddnewcinemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddnewcinemaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddnewcinemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
