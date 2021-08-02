import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNewJobComponent } from './modal-new-job.component';

describe('ModalNewJobComponent', () => {
  let component: ModalNewJobComponent;
  let fixture: ComponentFixture<ModalNewJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalNewJobComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNewJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
