import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementPagesTemplateComponent } from './management-pages-template.component';

describe('ManagementPagesTemplateComponent', () => {
  let component: ManagementPagesTemplateComponent;
  let fixture: ComponentFixture<ManagementPagesTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementPagesTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementPagesTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
