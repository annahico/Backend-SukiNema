import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcinemaComponent } from './editcinema.component';

describe('EditcinemaComponent', () => {
  let component: EditcinemaComponent;
  let fixture: ComponentFixture<EditcinemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditcinemaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditcinemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
