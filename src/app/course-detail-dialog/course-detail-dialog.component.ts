import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Course } from '../models/courses';
import { Classroom } from '../models/classroom';

@Component({
  selector: 'app-course-detail-dialog',
  templateUrl: './course-detail-dialog.component.html',
  styleUrls: ['./course-detail-dialog.component.css']
})
export class CourseDetailDialogComponent implements OnInit {

  course: Course;
  classroom: Classroom;

  constructor(
    public dialogRef: MatDialogRef<CourseDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any
  ) { }

  ngOnInit(): void {
    this.course = this.dialogData[0];
    this.classroom = this.dialogData[1];
    console.log(this.course.code)
    console.log(this.classroom.name)
  }


}
