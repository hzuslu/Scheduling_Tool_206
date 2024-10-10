import { Component } from '@angular/core';
import { CourseService } from '../services/course.service';
import { Course } from '../models/courses';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent {

  constructor(private courseService: CourseService) { }

  courseList: Course[] = [];
  selectedCourse: Course;

  ngOnInit(): void {
    this.getCourseList();
  }

  getCourseList() {
    this.courseService.getCourseList().subscribe(items => this.courseList = items);
  }

  onSelect(course: Course): void {
    this.selectedCourse = course;
  }

}
