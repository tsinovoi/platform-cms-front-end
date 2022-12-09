import { TestBed } from '@angular/core/testing';

import { UkgCalendarEventsService } from './ukg-calendar-events.service';

describe('UkgCalendarEventsService', () => {
  let service: UkgCalendarEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UkgCalendarEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
