import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardWorkComponent } from './card-work.component';

describe('CardWorkComponent', () => {
  let component: CardWorkComponent;
  let fixture: ComponentFixture<CardWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardWorkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
