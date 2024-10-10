import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Course } from '../models/courses';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private allCourses: Course[] = [];

  constructor() { }

  createCourseList(fileContent: string) {
    const lines = fileContent.split('\r\n');

    lines.forEach(line => {
      if (!line.trim()) return;

      const parts = line.split(',');

      const courseCode = parts[0];
      const name = parts[1];
      const semesterYear = parts[2];
      const credit = parts[3];
      const type = parts[4];
      const department = parts[5];
      const studentCount = parts[6];
      const instructor = parts[7];
      const hoursPreference = +parts[8] == 3 ? "A" : "B"; //3 ise A , 2+1 ise B
      const course = new Course(courseCode, name, semesterYear, +credit, type, department, +studentCount, instructor, hoursPreference);
      this.allCourses.push(course);
    });
  }

  getCourseList(): Observable<Course[]> {
    return of(this.allCourses);
  }

  getCourseByCode(code: string | null): Observable<Course | undefined> {
    return of(this.allCourses.find(item => item.code == code))
  }

  public updateCourse(course: Course): Observable<void> {
    let updatedCourse = this.allCourses.find(item => item.code == course.code);
    if (updatedCourse) {
      updatedCourse.name = course.name
      updatedCourse.semesterYear = course.semesterYear
      updatedCourse.credit = course.credit
      updatedCourse.instructor = course.instructor
      updatedCourse.type = course.type
      updatedCourse.studentCount = course.studentCount
      updatedCourse.department = course.department
      updatedCourse.hoursPreference = course.hoursPreference
      course.updateCourseHour()

    }
    return of(undefined);
  }

  addCourse(newCourse: Course): Observable<void> {
    this.allCourses.push(newCourse);
    return of(undefined);
  }

  deleteCourse(course: Course | undefined): void {
    this.allCourses = this.allCourses.filter(item => item != course)
  }
}
