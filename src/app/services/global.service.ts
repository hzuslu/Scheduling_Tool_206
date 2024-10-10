import { Injectable } from '@angular/core';
import { ScheduleFormat } from '../models/schedule';
import { Classroom } from '../models/classroom';
import { Course } from '../models/courses';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  firstYear: ScheduleFormat[] = []
  secondYear: ScheduleFormat[] = []
  thirdYear: ScheduleFormat[] = []
  fourthYear: ScheduleFormat[] = []

  defaultScheduleFormat: ScheduleFormat = new ScheduleFormat(new Classroom("", 0), new Course("", "", "", 0, "", "", 0, "", ""))

  createLists(): void {
    for (let i = 0; i < 40; i++) {
      this.firstYear.push(this.defaultScheduleFormat)
      this.secondYear.push(this.defaultScheduleFormat)
      this.thirdYear.push(this.defaultScheduleFormat)
      this.fourthYear.push(this.defaultScheduleFormat)
    }
  }


  constructor() {
    this.createLists();
  }

  getFirstYearList(): Observable<ScheduleFormat[]> {
    return of(this.firstYear);
  }

  getSecondYearList(): Observable<ScheduleFormat[]> {
    return of(this.secondYear);
  }

  getThirdYearList(): Observable<ScheduleFormat[]> {
    return of(this.thirdYear);
  }

  getFourthYearList(): Observable<ScheduleFormat[]> {
    return of(this.fourthYear);
  }
}
