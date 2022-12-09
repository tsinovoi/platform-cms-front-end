import { Component } from '@angular/core';
import { UkgCalendarEventsService } from 'src/app/core/services/ukg-calendar-events.service';
import { UkgCalendarEvent } from 'src/app/core/models/ukg-calendar-event';


@Component({
  selector: 'app-ukg-calendar-events',
  templateUrl: './ukg-calendar-events.component.html',
  styleUrls: ['./ukg-calendar-events.component.css']
})
export class UkgCalendarEventsComponent {
  events$ = this.eventService.getEvents();

  constructor(private eventService: UkgCalendarEventsService) { }

}
