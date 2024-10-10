import { Component, OnInit } from '@angular/core';
import { ClassroomService } from '../services/classroom.service';
import { ServiceService } from '../services/service.service';
import { Classroom } from '../models/classroom';
import { Service } from '../models/service';
import { CourseService } from '../services/course.service';
import { Course } from '../models/courses';

@Component({
  selector: 'app-constraints',
  templateUrl: './constraints.component.html',
  styleUrls: ['./constraints.component.css']
})
export class ConstraintsComponent implements OnInit {

  classroomList: Classroom[];
  serviceList: Service[];
  courseList: Course[]
  selectedClassroom: Classroom;
  selectedCapacity: number;
  selectedService: Service = new Service("", "", []);
  selectedDay: string;
  addClassroomName: string;
  addClassroomCapacity: number;
  tempDay = this.selectedService.day
  tempTimings = this.selectedService.timings
  tempDay2 = this.selectedService.day
  tempTimings2 = this.selectedService.timings

  daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];


  constructor(private classroomService: ClassroomService, private serviceService: ServiceService, private courseService: CourseService) { }

  ngOnInit() {
    this.initLists();
  }

  initLists() {
    this.classroomService.getClassroomList().subscribe(items => this.classroomList = items);
    this.serviceService.getServiceList().subscribe(items => this.serviceList = items);
    this.courseService.getCourseList().subscribe(items => this.courseList = items);
  }

  updateClassroomCapacity(newCapacity: number): void {

    if (!newCapacity) {
      alert('Please enter a capacity value.');
      return;
    }


    if (this.selectedClassroom) {

      this.selectedClassroom.capacity = newCapacity;
      this.classroomService.sortClassrooms();
    }
  }


  uptadeConstraintsValues() {
    this.tempDay = this.selectedService.day
    this.tempTimings = this.selectedService.timings
    this.tempDay2 = this.selectedService.day
    this.tempTimings2 = this.selectedService.timings

    console.log(this.tempDay)
    console.log(this.tempTimings)
  }



  updateService(): void {
    if (!this.tempDay2 ||
      !this.tempTimings2 ||
      !this.selectedService.courseCode) {
      alert('Please enter valid values for timings, day, and course code.');
      return;
    }

    let check = true

    const timingsArray: string[] = this.selectedService.timings
      .toString()
      .split(",")
      .map(time => time.trim());


    this.serviceList.forEach(item => {
      let course = this.courseList.find(course => course.code === item.courseCode);
      let selectedCourse = this.courseList.find(course => course.code === this.selectedService.courseCode);
      if (course?.semesterYear == selectedCourse?.semesterYear) {

        if (course?.semesterYear === selectedCourse?.semesterYear && item.day === this.selectedDay && timingsArray.some(time => item.timings.includes(time))) {
          check = false;
        }
      }
    });


    if (!check) {
      alert("There's already a class scheduled for this day and time with the same semester year.");

      this.serviceService.getServiceList().subscribe(
        item => {
          item.forEach((element) => {
            if (element.courseCode == this.selectedService.courseCode) {
              element.day = this.tempDay
              element.timings = this.tempTimings

            }
          });

        }
      )

      return;
    }

    this.selectedService.day = this.tempDay2
    this.selectedService.timings = this.tempTimings2

    alert("Service Updated Successfully");
  }




  addClassroom(): void {
    if (this.addClassroomName === undefined || this.addClassroomCapacity === undefined) {
      alert('Please enter a valid input');
      return;
    }

    if (isNaN(this.addClassroomCapacity)) {
      alert('Please enter a valid number for capacity');
      return;
    }

    let addedClassroom = new Classroom(this.addClassroomName, +this.addClassroomCapacity);
    this.classroomService.addClassroom(addedClassroom);
    this.initLists();
  }

  deleteClassroom(): void {

    if (!this.selectedClassroom) {
      return alert("First select a classroom!")
    }

    const confirmDelete = confirm('Are you sure you want to delete this classroom?');
    if (confirmDelete) {
      this.classroomService.deleteClassroom(this.selectedClassroom)
      alert('Classroom deleted successfully.');
      this.initLists();
    }

  }

  deleteService(): void {

    if (!this.selectedService) {
      return alert("First select a service!")
    }

    const confirmDelete = confirm('Are you sure you want to delete this service?');
    if (confirmDelete) {
      this.serviceService.deleteService(this.selectedService)
      alert('Service deleted successfully.');
      this.initLists();
    }

  }


}
