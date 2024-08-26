import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectcinemaComponent } from './selectcinema.component';

describe('SelectcinemaComponent', () => {
  let component: SelectcinemaComponent;
  let fixture: ComponentFixture<SelectcinemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectcinemaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectcinemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
