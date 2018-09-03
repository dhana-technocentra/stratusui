import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPhoneComponent } from './order-phone.component';

describe('OrderPhoneComponent', () => {
  let component: OrderPhoneComponent;
  let fixture: ComponentFixture<OrderPhoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderPhoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
