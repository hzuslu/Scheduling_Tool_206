import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SchedulePageComponent } from './schedule-page/schedule-page.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CourseListComponent } from './course-list/course-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ConstraintsComponent } from './constraints/constraints.component';
import { FormsModule } from '@angular/forms';
import { AddCourseComponent } from './add-course/add-course.component';
import { CourseDetailDialogComponent } from './course-detail-dialog/course-detail-dialog.component';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogModule,
} from '@angular/material/dialog';
import { DialogModule } from '@angular/cdk/dialog';
import { BusyListComponent } from './busy-list/busy-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    SchedulePageComponent,
    CourseDetailComponent,
    CourseListComponent,
    NavbarComponent,
    ConstraintsComponent,
    AddCourseComponent,
    CourseDetailDialogComponent,
    BusyListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatDialogModule,
    MatDialogTitle,
    MatDialogContent,
    DialogModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
