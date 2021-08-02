import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelAddJobMemberComponent } from './model-add-job-member.component';

describe('ModelAddJobMemberComponent', () => {
  let component: ModelAddJobMemberComponent;
  let fixture: ComponentFixture<ModelAddJobMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelAddJobMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelAddJobMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
