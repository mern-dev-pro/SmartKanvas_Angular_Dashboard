import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditJobMemberComponent } from './modal-edit-job-member.component';

describe('ModalEditJobMemberComponent', () => {
  let component: ModalEditJobMemberComponent;
  let fixture: ComponentFixture<ModalEditJobMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditJobMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditJobMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
