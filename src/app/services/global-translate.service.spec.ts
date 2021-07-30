import { TestBed } from '@angular/core/testing';

import { GlobalTranslateService } from './global-translate.service';

describe('GlobalTranslateService', () => {
  let service: GlobalTranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalTranslateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
