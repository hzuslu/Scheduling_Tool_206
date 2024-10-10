import { Injectable } from '@angular/core';
import { Instructor } from '../models/busy';
import { Observable, of } from 'rxjs';
import { CourseService } from './course.service';


@Injectable({
  providedIn: 'root'
})
export class BusyService {

  constructor(
    private courseService: CourseService,
  ) {
  }

  private allInstructors: Instructor[] = [];
  private allBusyInstructor: Instructor[] = [];


  createBusyList(fileContent: string) {
    const lines = fileContent.split('\r\n');
    lines.forEach(line => {
      if (!line.trim()) return;

      line = line.replace(/"/g, '');
      const parts = line.split(',');

      const instructor = parts[0];
      const day = parts[1];
      let flag = true;
      this.allBusyInstructor.forEach(item => {
        if (item.name == instructor)
          flag = false;
      });
      if (flag) {
        this.allBusyInstructor.push(new Instructor(instructor));
      }
      this.allBusyInstructor.forEach(item => {
        if (item.name == instructor) {
          for (let i = 2; i < parts.length; i++) {
            item.setBusyTime(day, parts[i])
          }
        }
      });
    });

    this.resetandgetInstructorList()
  }

  getInstructorList(): Observable<Instructor[]> {
    return of(this.allInstructors);
  }

  getBusyInstructorList(): Observable<Instructor[]> {
    return of(this.allBusyInstructor);
  }

  createInstructorList(): void {
    this.courseService.getCourseList().subscribe(items => {
      items.forEach(item => {
        let contain = false;
        this.allInstructors.forEach(element => {
          if (item.instructor == element.name)
            contain = true;
        });
        if (!contain) {
          const instructor = new Instructor(item.instructor);
          instructor.resetTheBusyTime();
          this.allInstructors.push(instructor);
        }
      });
    });

  }
  resetandgetInstructorList(): Observable<Instructor[]> {
    this.allInstructors = [];
    this.createInstructorList();
    for (let i = 0; i < this.allInstructors.length; i++) {
      for (let j = 0; j < this.allBusyInstructor.length; j++) {
        if (this.allInstructors[i].name == this.allBusyInstructor[j].name) {
          for (let k = 0; k < this.allBusyInstructor[j].busyTimes.length; k++) {
            this.allInstructors[i].setBusyTime(this.allBusyInstructor[j].busyTimes[k].day, this.allBusyInstructor[j].busyTimes[k].time);
          }
          break;
        }
      }
    }
    return of(this.allInstructors);
  }

}
