import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UkgCalendarEventsComponent } from './ukg-calendar-events.component';

describe('UkgCalendarEventsComponent', () => {
  let component: UkgCalendarEventsComponent;
  let fixture: ComponentFixture<UkgCalendarEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UkgCalendarEventsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UkgCalendarEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
