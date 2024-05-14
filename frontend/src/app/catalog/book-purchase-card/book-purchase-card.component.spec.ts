import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookPurchaseCardComponent } from './book-purchase-card.component';

describe('BookPurchaseCardComponent', () => {
  let component: BookPurchaseCardComponent;
  let fixture: ComponentFixture<BookPurchaseCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookPurchaseCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookPurchaseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
