import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasTemplateComponent } from './canvas-template.component';

describe('CanvasTemplateComponent', () => {
  let component: CanvasTemplateComponent;
  let fixture: ComponentFixture<CanvasTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanvasTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
