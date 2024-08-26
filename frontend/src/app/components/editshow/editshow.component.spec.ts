import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditshowComponent } from './editshow.component';

describe('EditshowComponent', () => {
  let component: EditshowComponent;
  let fixture: ComponentFixture<EditshowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditshowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
