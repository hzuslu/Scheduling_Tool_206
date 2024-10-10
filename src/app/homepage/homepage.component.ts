import { Component } from '@angular/core';
import { BusyService } from '../services/busy.service';
import { ClassroomService } from '../services/classroom.service';
import { ServiceService } from '../services/service.service';
import { CourseService } from '../services/course.service';
import { MakeScheduleService } from '../services/make-schedule.service';



@Component({
  selector: 'homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {


  constructor(
    private busyService: BusyService,
    private classroomService: ClassroomService,
    private courseService: CourseService,
    private servicesService: ServiceService,


  ) { }

  handleCourseFileInput(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const fileContent = e.target!.result as string;
      this.courseService.createCourseList(fileContent);
    };

    reader.onerror = (e) => {
      console.error("Dosya okuma hatası:", e);
    };

    reader.readAsText(file);
  }

  handleClassroomFileInput(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const fileContent = e.target!.result as string;
      this.classroomService.createClassroomList(fileContent);
    };

    reader.onerror = (e) => {
      console.error("Dosya okuma hatası:", e);
    };

    reader.readAsText(file);

  }

  handleBusyFileInput(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const fileContent = e.target!.result as string;
      this.busyService.createBusyList(fileContent);
    };

    reader.onerror = (e) => {
      console.error("Dosya okuma hatası:", e);
    };

    reader.readAsText(file);
  }


  handleServiceFileInput(event: any) {

    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const fileContent = e.target!.result as string;
      this.servicesService.createServiceList(fileContent);
    };

    reader.onerror = (e) => {
      console.error("Dosya okuma hatası:", e);
    };

    reader.readAsText(file);

  }


}
