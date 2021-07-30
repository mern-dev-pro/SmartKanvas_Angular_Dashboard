import { TestBed } from '@angular/core/testing';

import { CanvasTemplateService } from './canvas-template.service';

describe('CanvasTemplateService', () => {
  let service: CanvasTemplateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanvasTemplateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
