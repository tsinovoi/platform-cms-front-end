import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IgniteModule } from '@ignite/angular';
import { UkgCalendarEventsComponent } from './ukg-calendar-events/ukg-calendar-events.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: UkgCalendarEventsComponent}
];

@NgModule({
  declarations: [
    UkgCalendarEventsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    IgniteModule
  ]
})
export class FeaturesModule { }
