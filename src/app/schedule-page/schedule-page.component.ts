import { Component, OnInit } from '@angular/core';
import { Course } from '../models/courses';
import { CourseService } from '../services/course.service';
import { MakeScheduleService } from '../services/make-schedule.service';
import { Schedule, ScheduleFormat } from '../models/schedule';
import { Classroom } from '../models/classroom';
import { ClassroomService } from '../services/classroom.service';
import { GlobalService } from '../services/global.service';
import { CourseDetailComponent } from '../course-detail/course-detail.component';
import { MatDialog } from '@angular/material/dialog';
import { CourseDetailDialogComponent } from '../course-detail-dialog/course-detail-dialog.component';
import { BusyService } from '../services/busy.service';
import { Busy, Instructor } from '../models/busy';

@Component({
  selector: 'schedule-page',
  templateUrl: './schedule-page.component.html',
  styleUrls: ['./schedule-page.component.css']
})
export class SchedulePageComponent implements OnInit {

  firstYear: ScheduleFormat[]
  secondYear: ScheduleFormat[]
  thirdYear: ScheduleFormat[]
  fourthYear: ScheduleFormat[]

  constructor(
    private courseService: CourseService,
    private makeSchedule: MakeScheduleService,
    private classroomService: ClassroomService,
    private globalService: GlobalService,
    private busyService: BusyService,
    public dialog: MatDialog) {

  }

  defaultCourse: Course = new Course("", "", "", 0, "", "", 0, "", "");
  daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];



  selectedCourse: string = '';
  selectedDay: string = '';
  selectedHour: string = '';
  selectedClass: string = '';

  allCourses: Course[] = []
  allClassrooms: Classroom[] = []
  allInstructors: Instructor[] = []
  allBusyInstructors: Instructor[] = []
  allBusy: Busy[] = []

  schedule: Schedule

  hours = [
    '8:30-09:30',
    '9:30-10:30',
    '10:30-11:30',
    '11:30-12:30',
    '12:30-13:30',
    '13:30-14:30',
    '14:30-15:30',
    '15:30-16:30'
  ];

  days: number[] = [0, 1, 2, 3, 4];

  selectedOption: number = 1;

  changeOption(option: number) {
    this.selectedOption = option;
  }

  ngOnInit(): void {
    this.getCourseLists();

  }

  getCourseLists() {
    this.courseService.getCourseList().subscribe(items => {
      this.allCourses = items;
    });

    this.classroomService.getClassroomList().subscribe(items => {
      this.allClassrooms = items
    })

    this.busyService.getInstructorList().subscribe(items => {
      this.allInstructors = items
    })

    this.busyService.getBusyInstructorList().subscribe(items => {
      this.allBusyInstructors = items
    })

    this.globalService.getFirstYearList().subscribe(items => {
      this.firstYear = items
    })

    this.globalService.getSecondYearList().subscribe(items => {
      this.secondYear = items
    })

    this.globalService.getThirdYearList().subscribe(items => {
      this.thirdYear = items
    })

    this.globalService.getFourthYearList().subscribe(items => {
      this.fourthYear = items
    })
  }


  deneme() {
    this.makeSchedule.showScheduleButton();

    this.schedule = this.makeSchedule.schedule;
    this.globalService.firstYear = this.schedule.firstYear
    this.globalService.secondYear = this.schedule.secondYear
    this.globalService.thirdYear = this.schedule.thirdYear
    this.globalService.fourthYear = this.schedule.fourthYear
    this.getCourseLists();
  }

  addCourse() {
    if (this.selectedCourse === "") {
      alert("Please select a course.");
      return;
    }

    if (this.selectedDay === "") {
      alert("Please select a day.");
      return;
    }

    if (this.selectedHour === "") {
      alert("Please select an hour.");
      return;
    }

    if (this.selectedClass === "") {
      alert("Please select a class.");
      return;
    }


    let check = true;
    const classroom = this.allClassrooms.find(item => item.name === this.selectedClass);
    const course = this.allCourses.find(item => item.code === this.selectedCourse);
    const dayIndex = this.daysOfWeek.indexOf(this.selectedDay)
    const hourIndex = this.hours.indexOf(this.selectedHour)
    const addedIndex = dayIndex * 8 + hourIndex
    let tempHour = this.selectedHour.substring(0, 3)
    const addedScheduleFormat = new ScheduleFormat(classroom!, course!)
    const instructorName = course?.instructor
    const instructor = this.allInstructors.find(item => item.name == instructorName)


    console.log(this.allInstructors)
    console.log(tempHour)


    instructor?.busyTimes.forEach(element => {
      if (element.day == this.selectedDay && element.time.substring(0, 3) == tempHour) {
        check = false
      }
    });

    console.log(check)


    switch (course?.semesterYear) {
      case "1":

        if (this.firstYear[addedIndex].course.code != "") {
          alert("This time slot is already taken.")
        }
        else if (this.firstYear[addedIndex].classroom.name == classroom?.name ||
          this.secondYear[addedIndex].classroom.name == classroom?.name ||
          this.thirdYear[addedIndex].classroom.name == classroom?.name ||
          this.fourthYear[addedIndex].classroom.name == classroom?.name) {
          alert("This classroom is already taken.")
        }
        else if (!check) {
          alert("This instructor is already busy at this time.")
        }
        else if (course.studentCount > classroom!.capacity) {
          alert("This classroom is not enough for student capacity.")
        }

        else {
          this.firstYear[addedIndex] = addedScheduleFormat
        }
        break;


      case "2":

        if (this.secondYear[addedIndex].course.code != "") {
          alert("This time slot is already taken.")
        }
        else if (this.firstYear[addedIndex].classroom.name == classroom?.name ||
          this.secondYear[addedIndex].classroom.name == classroom?.name ||
          this.thirdYear[addedIndex].classroom.name == classroom?.name ||
          this.fourthYear[addedIndex].classroom.name == classroom?.name) {
          alert("This classroom is already taken.")
        }
        else if (!check) {
          alert("This instructor is already busy at this time.")
        }
        else if (course.studentCount > classroom!.capacity) {
          alert("This classroom is not enough for student capacity.")
        }

        else {
          this.secondYear[addedIndex] = addedScheduleFormat
        }
        break;

      case "3":

        if (this.thirdYear[addedIndex].course.code != "") {
          alert("This time slot is already taken.")
        }
        else if (this.firstYear[addedIndex].classroom.name == classroom?.name ||
          this.secondYear[addedIndex].classroom.name == classroom?.name ||
          this.thirdYear[addedIndex].classroom.name == classroom?.name ||
          this.fourthYear[addedIndex].classroom.name == classroom?.name) {
          alert("This classroom is already taken.")
        }
        else if (!check) {
          alert("This instructor is already busy at this time.")
        }
        else if (course.studentCount > classroom!.capacity) {
          alert("This classroom is not enough for student capacity.")
        }

        else {
          this.thirdYear[addedIndex] = addedScheduleFormat
        }
        break;
      case "4":

        if (this.fourthYear[addedIndex].course.code != "") {
          alert("This time slot is already taken.")
        }
        else if (this.firstYear[addedIndex].classroom.name == classroom?.name ||
          this.secondYear[addedIndex].classroom.name == classroom?.name ||
          this.thirdYear[addedIndex].classroom.name == classroom?.name ||
          this.fourthYear[addedIndex].classroom.name == classroom?.name) {
          alert("This classroom is already taken.")
        }
        else if (!check) {
          alert("This instructor is already busy at this time.")
        }
        else if (course.studentCount > classroom!.capacity) {
          alert("This classroom is not enough for student capacity.")
        }

        else {
          this.fourthYear[addedIndex] = addedScheduleFormat
        }
        break;
    }

    this.selectedCourse = "";
    this.selectedDay = "";
    this.selectedHour = "";
    this.selectedClass = "";
  }


  openDetailDialog(classCode: string, roomCode: string) {
    let course = this.allCourses.find(item => item.code === classCode);
    let classroom = this.allClassrooms.find(item => item.name === roomCode);

    const dialogRef = this.dialog.open(CourseDetailDialogComponent, {
      data: [
        course,
        classroom
      ],
      disableClose: false,
      autoFocus: true,
      width: '30rem',
      height: '30rem'
    });
  }






}
