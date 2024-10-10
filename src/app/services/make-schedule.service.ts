import { Injectable, OnInit } from '@angular/core';
import { BusyService } from './busy.service';
import { ServiceService } from './service.service';
import { ClassroomService } from './classroom.service';
import { CourseService } from './course.service';
import { Classroom } from '../models/classroom';
import { Service } from '../models/service';
import { Instructor } from '../models/busy';
import { Course } from '../models/courses';
import { Schedule, ScheduleFormat } from '../models/schedule';

@Injectable({
  providedIn: 'root'
})
export class MakeScheduleService {

  allCourses: Course[] = []
  allInstructors: Instructor[] = []
  allService: Service[] = []
  allClassroom: Classroom[] = []
  schedule: Schedule

  days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  times = ["8:30", "9:30", "10:30", "11:30", "12:30", "13:30", "14:30", "15:30"];



  constructor(
    private busyService: BusyService,
    private serviceService: ServiceService,
    private classroomService: ClassroomService,
    private coursesService: CourseService) {
  }




  createLists(): void {
    this.busyService.resetandgetInstructorList().subscribe(items => {
      this.allInstructors = items;
    });
    this.classroomService.getClassroomList().subscribe(items => {
      this.allClassroom = items;
      for (let i = 0; i < this.allClassroom.length; i++) {
        this.allClassroom[i].resetClassroom();
      }
    });
    this.coursesService.getCourseList().subscribe(items => {
      this.allCourses = items;
      for (let i = 0; i < this.allCourses.length; i++) {
        this.allCourses[i].resetCourse();
      }
    });
    this.serviceService.getServiceList().subscribe(items => {
      this.allService = items;
    });
    this.schedule = new Schedule(this.allClassroom);

  }

  hasValidCourses(allCourses: Course[], name: string): Course {
    for (let obj of allCourses) {
      if (obj.code === name) {
        return obj;
      }
    }
    return allCourses[0]
  }

  hasValidInstructor(allInstructors: Instructor[], name: string): Instructor {
    for (let obj of allInstructors) {
      if (obj.name === name) {
        return obj;
      }
    }
    return allInstructors[0]
  }

  hasSameSemesterYear(schedule: ScheduleFormat[], semesterYear: string): boolean {
    for (let s of schedule) {
      let course = this.hasValidCourses(this.allCourses, s.course.code);
      if (course.semesterYear == semesterYear) {
        return true;
      }
    }
    return false;
  }
  hasroomMultiplecheck(index: number, day: string, time: string): boolean {
    for (let i = index; i < this.allClassroom.length; i++) {
      if (this.allClassroom[i].hasRoom(day, time)) {
        return true;
      }
    }
    return false;
  }


  createForServiceSchedule(): void {
    this.allService.forEach(element => {
      let s_course = this.hasValidCourses(this.allCourses, element.courseCode);
      let timerow = element.timings;

      for (let i = 0; i < timerow.length; i++) {
        if (s_course.isCourseHourFull() || this.hasValidInstructor(this.allInstructors, s_course.instructor).isBusy(element.day, timerow[i])) {
          continue;
        }
        for (let j = 0; j < this.allClassroom.length; j++) {
          let currentRoom = this.allClassroom[j];
          let nextRoom = this.allClassroom[j + 1];

          if ((j === this.allClassroom.length - 1 || s_course.studentCount >= nextRoom.capacity) && currentRoom.hasRoom(element.day, timerow[i]) && s_course.studentCount <= currentRoom.capacity) {
            this.addCourseInSchedule(s_course, currentRoom, element.day, timerow[i]);
            break;
          }
        }
      }
    });
  }

  createForAllCourseSchedule(schedule: Schedule, allCourses: Course[]): void {
    for (let cItem of allCourses) {
      if (cItem.isCourseHourFull()) {
        continue;
      }
      for (let j = 0; j < cItem.calcHour.length; j++) {
        let requiredHours = cItem.calcHour[j];

        for (let day of this.days) {
          if (cItem.isCourseHourFull()) {
            break;
          }
          else if (cItem.serveHours == requiredHours) {
            if (j < cItem.calcHour.length) {
              j++;
              requiredHours = cItem.calcHour[j];
            }
          }
          for (let time = 0; time <= (this.times.length - requiredHours); time++) {
            if (cItem.isCourseHourFull()) {
              break;
            }
            let canPlace = true;
            for (let i = time; i < time + requiredHours; i++) {
              if (!(cItem.serveHours == requiredHours || this.hasValidInstructor(this.allInstructors, cItem.instructor).isBusy(day, this.times[i]))) {
                if (this.hasSameSemesterYear(schedule.schedule_table[day][this.times[i]], cItem.semesterYear)) {
                  canPlace = false;
                  break;
                } else {
                  for (let k = 0; k < this.allClassroom.length; k++) {
                    if (k === this.allClassroom.length - 1 && cItem.manipulatedCapacity <= this.allClassroom[k].capacity) {
                      if (!this.allClassroom[k].hasRoom(day, this.times[i])) {
                        canPlace = false;
                        break;
                      }
                    }
                    else if (k < this.allClassroom.length - 1 && cItem.manipulatedCapacity > this.allClassroom[k + 1].capacity) {
                      if (!this.allClassroom[k].hasRoom(day, this.times[i])) {
                        canPlace = false;
                        break;
                      }
                    }
                  }
                }
              } else {
                canPlace = false;
                break;
              }
            }
            if (canPlace) {
              for (let i = time; i < time + requiredHours; i++) {
                for (let k = 0; k < this.allClassroom.length; k++) {
                  if (k == this.allClassroom.length - 1 && cItem.manipulatedCapacity <= this.allClassroom[k].capacity && this.allClassroom[k].hasRoom(day, this.times[i])) {
                    this.addCourseInSchedule(cItem, this.allClassroom[k], day, this.times[i]);
                    break;
                  } else if (cItem.manipulatedCapacity > this.allClassroom[k + 1].capacity && this.allClassroom[k].hasRoom(day, this.times[i])) {
                    this.addCourseInSchedule(cItem, this.allClassroom[k], day, this.times[i]);
                    break;
                  }
                }
              }
              break;
            }
          }
        }
        if (j == cItem.calcHour.length - 1 && !cItem.isCourseHourFull()) {
          for (let k = this.allClassroom.length - 1; k > 0; k--) {
            if (cItem.manipulatedCapacity <= this.allClassroom[k].capacity) {
              cItem.manipulatedCapacity = this.allClassroom[k].capacity + 1;
              j = -1;
              break;
            }
          }
        }
      }
      cItem.manipulatedCapacity = cItem.studentCount;
    }
  }

  addCourseInSchedule(course: Course, classroom: Classroom, day: string, time: string): void {
    course.incServeHour();
    classroom.room[day][time] += 1;
    this.hasValidInstructor(this.allInstructors, course.instructor).setBusyTime(day, time);
    this.schedule.schedule_table[day][time].push(new ScheduleFormat(classroom, course));
  }

  checkUnplacedCourses(allCourses: Course[], remainedCourses: Course[]): boolean {
    let leftCourseCheck = true;
    for (let cItem of allCourses) {
      if (!cItem.isCourseHourFull() && !remainedCourses.includes(cItem)) {
        remainedCourses.push(cItem);
        leftCourseCheck = false;
      }
    }
    return leftCourseCheck;
  }


  showScheduleButton(): void {
    this.createLists();
    let remainedCourses: Course[] = [];
    this.createForServiceSchedule();
    this.createForAllCourseSchedule(this.schedule, this.allCourses);
    let leftCourseCheck = this.checkUnplacedCourses(this.allCourses, remainedCourses);
    if (!leftCourseCheck) {
      this.createForAllCourseSchedule(this.schedule, remainedCourses);
      leftCourseCheck = this.checkUnplacedCourses(this.allCourses, remainedCourses);
      if (leftCourseCheck) {
        this.schedule.createArrays();
      }
      else {
        alert("The schedule you trying to create is not valid. Please sure your courses and its constraint!");
      }
    }
    else {
      this.schedule.createArrays();
    }
  }
}
