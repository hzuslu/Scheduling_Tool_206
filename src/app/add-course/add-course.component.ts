import { Component, OnInit } from '@angular/core';
import { Course } from '../models/courses';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css'
})
export class AddCourseComponent implements OnInit {

  courseCode: string = '';
  courseName: string = '';
  instructor: string = '';
  studentCount: string = '';
  credit: number = 0;
  semesterYear: string = '';
  department: string = '';
  type: string = '';
  hoursPreference: string = '';
  allInstructors: string[] = []
  allCourse: Course[] = []

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {


    this.courseService.getCourseList().subscribe(courseList => {
      this.allCourse = courseList;

      const instructorSet = new Set<Course['instructor']>();
      this.allCourse.forEach(course => {
        instructorSet.add(course.instructor);
      });

      this.allInstructors = Array.from(instructorSet);
      this.allInstructors.push("PROF.DR. FATIH DEMIRCI")
    });

  }

  updateCourse() {
    if (this.courseCode === '' || this.courseName === '' || this.instructor === '' || this.studentCount === '' || this.semesterYear === '' || this.department === '' || this.type === '' || this.hoursPreference === '') {
      alert('Please fill in all fields');
      return;
    }

    let newCourse = new Course(this.courseCode, this.courseName, this.semesterYear, +this.credit, this.type, this.department, +this.studentCount, this.instructor, this.hoursPreference)
    this.courseService.addCourse(newCourse).subscribe(() => {
      alert('Course added successfully');
      this.courseCode = '';
      this.courseName = '';
      this.instructor = '';
      this.studentCount = '';
      this.credit = 0;
      this.semesterYear = '';
      this.department = '';
      this.type = '';
      this.hoursPreference = '';
    });
  }
}





