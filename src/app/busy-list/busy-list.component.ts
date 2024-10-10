import { Component, OnInit } from '@angular/core';
import { Instructor } from '../models/busy';
import { BusyService } from '../services/busy.service';

@Component({
  selector: 'app-busy-list',
  templateUrl: './busy-list.component.html',
  styleUrl: './busy-list.component.css'
})
export class BusyListComponent implements OnInit {

  allInstructors: Instructor[]




  constructor(private busyService: BusyService) {
  }

  ngOnInit(): void {
    this.busyService.getBusyInstructorList().subscribe(item => this.allInstructors = item)

  }
}
