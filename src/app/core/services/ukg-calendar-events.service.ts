import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { UkgCalendarEvent } from '../models/ukg-calendar-event';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class UkgCalendarEventsService {
  private eventsPath = 'calendar-events';

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line: typedef
  getEvents(){
    return this.http.get(environment.apiUrl + this.eventsPath);
    // .pipe(
    //   map((data: UkgCalendarEvent[]) => {
    //     return data;
    //   }), catchError( error => {
    //     return throwError( 'Something went Wrong!');
    //   })
    // );
  }
}
