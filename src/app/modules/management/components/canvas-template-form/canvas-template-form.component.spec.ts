import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasTemplateFormComponent } from './canvas-template-form.component';

describe('CanvasTemplateFormComponent', () => {
  let component: CanvasTemplateFormComponent;
  let fixture: ComponentFixture<CanvasTemplateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanvasTemplateFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasTemplateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
