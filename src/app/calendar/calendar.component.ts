import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UkgCalendarEventsService } from '../core/services/ukg-calendar-events.service';
import { map } from 'rxjs/operators';
import { from, Observable } from 'rxjs';
import { CalendarEvent, CalendarView, CalendarModule, CalendarMonthModule } from 'angular-calendar';
import {
  isSameMonth,
  isSameDay,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay,
  format,
} from 'date-fns';
import { colors } from '../demo-utils/colors';
import { UkgCalendarEvent } from '../core/models/ukg-calendar-event';

interface UKGEvent {
  id: string;
  title: string;
  allDay: boolean;
  category: string;
  startDate: string;
  endDate: string;
}

function getTimezoneOffsetString(date: Date): string {
  const timezoneOffset = date.getTimezoneOffset();
  const hoursOffset = String(
    Math.floor(Math.abs(timezoneOffset / 60))
  ).padStart(2, '0');
  const minutesOffset = String(Math.abs(timezoneOffset % 60)).padEnd(2, '0');
  const direction = timezoneOffset > 0 ? '-' : '+';

  return `T00:00:00${direction}${hoursOffset}:${minutesOffset}`;
}

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date();

  events$!: Observable<CalendarEvent<{ ukgCalendarEvent: UKGEvent }>[]>;

  activeDayIsOpen: boolean = false;

  constructor(private httpClient: HttpClient, private eventService: UkgCalendarEventsService) {}

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents(): void {
    const getStart: any = {
      month: startOfMonth,
      week: startOfWeek,
      day: startOfDay,
    }[this.view];

    const getEnd: any = {
      month: endOfMonth,
      week: endOfWeek,
      day: endOfDay,
    }[this.view];

    // const params = new HttpParams()
    //   .set(
    //     'primary_release_date.gte',
    //     format(getStart(this.viewDate), 'yyyy-MM-dd')
    //   )
    //   .set(
    //     'primary_release_date.lte',
    //     format(getEnd(this.viewDate), 'yyyy-MM-dd')
    //   )
    //   .set('api_key', '0ec33936a68018857d727958dca1424f');

    this.events$ = this.eventService.getEvents()
    .pipe(
      map(({ data }: { data: UKGEvent[]}) => {
        return data.map((ukgCalendarEvent: UKGEvent) => {
          return {
            title: ukgCalendarEvent.title,
            start: new Date(ukgCalendarEvent.startDate + getTimezoneOffsetString(this.viewDate)) ,
            end: new Date(ukgCalendarEvent.endDate + getTimezoneOffsetString(this.viewDate)),
            color: colors.yellow,
            allDay: ukgCalendarEvent.allDay,
            // tslint:disable-next-line: whitespace
            meta:{ ukgCalendarEvent,}
          };
        });
      })
      );
  }

  dayClicked({
    date,
    events,
  }: {
    date: Date;
    events: CalendarEvent<{ ukgCalendarEvent: UkgCalendarEvent }>[];
  }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventClicked(event: CalendarEvent<{ ukgCalendarEvent: UkgCalendarEvent }>): void {
    window.open(
      `https://www.themoviedb.org/movie/`,
      '_blank'
    );
  }
}
