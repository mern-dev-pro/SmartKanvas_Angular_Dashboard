import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCanvasComponent } from './card-canvas.component';

describe('CardCanvasComponent', () => {
  let component: CardCanvasComponent;
  let fixture: ComponentFixture<CardCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardCanvasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
