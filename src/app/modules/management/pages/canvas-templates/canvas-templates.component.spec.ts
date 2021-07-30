import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasTemplatesComponent } from './canvas-templates.component';

describe('CanvasTemplatesComponent', () => {
  let component: CanvasTemplatesComponent;
  let fixture: ComponentFixture<CanvasTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanvasTemplatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
