import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { SchedulePageComponent } from './schedule-page/schedule-page.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CourseListComponent } from './course-list/course-list.component';
import { ConstraintsComponent } from './constraints/constraints.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { BusyListComponent } from './busy-list/busy-list.component';


const routes: Routes = [
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { path: 'homepage', component: HomepageComponent },
  { path: 'schedule', component: SchedulePageComponent },
  { path: 'course-list', component: CourseListComponent },
  { path: 'course/:id', component: CourseDetailComponent },
  { path: 'constraints', component: ConstraintsComponent },
  { path: 'add-course', component: AddCourseComponent },
  { path: 'busy-list', component: BusyListComponent },
];


@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule { }
