import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewshowComponent } from './addnewshow.component';

describe('AddnewshowComponent', () => {
  let component: AddnewshowComponent;
  let fixture: ComponentFixture<AddnewshowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddnewshowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddnewshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
