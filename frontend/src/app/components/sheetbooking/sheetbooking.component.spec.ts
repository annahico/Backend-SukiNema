import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheetbookingComponent } from './sheetbooking.component';

describe('SheetbookingComponent', () => {
  let component: SheetbookingComponent;
  let fixture: ComponentFixture<SheetbookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SheetbookingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SheetbookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
