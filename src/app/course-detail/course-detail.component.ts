import { Component, OnInit } from '@angular/core';
import { Course } from '../models/courses';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.css'
})
export class CourseDetailComponent implements OnInit {

  paramUrl: string | null;
  currentCourse: Course | undefined;
  currentHourPreference: string | undefined;
  allInstructors: string[] = []
  allCourse: Course[] = []

  constructor(private route: ActivatedRoute, private router: Router, private courseService: CourseService) { }

  ngOnInit(): void {
    this.paramUrl = this.route.snapshot.paramMap.get('id');
    this.getCourseByCode();
  }

  getCourseByCode(): void {
    this.courseService.getCourseByCode(this.paramUrl).subscribe(item => {
      this.currentCourse = item;
      this.currentHourPreference = this.currentCourse?.hoursPreference;

      this.courseService.getCourseList().subscribe(courseList => {
        this.allCourse = courseList;

        const instructorSet = new Set<Course['instructor']>();
        this.allCourse.forEach(course => {
          instructorSet.add(course.instructor);
        });

        this.allInstructors = Array.from(instructorSet);
        this.allInstructors.push("PROF.DR. FATIH DEMIRCI")
      });
    });
  }


  updateCourse(course: Course): void {
    if (!course.name || !course.instructor || !course.studentCount || !course.credit) {
      alert('Cannot be empty field')
      return;
    }

    this.courseService.updateCourse(course);
    this.router.navigate(['course-list']);
  }

  deleteCourse(): void {
    const confirmDelete = confirm('Are you sure you want to delete this course?');

    if (confirmDelete) {
      this.courseService.deleteCourse(this.currentCourse);
      alert('Course deleted successfully.');
      this.router.navigate(['course-list']);
    }
  }

}
