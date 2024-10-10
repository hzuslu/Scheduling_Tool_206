import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Classroom } from '../models/classroom';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {



  private allClassroom: Classroom[] = [];


  constructor() { }

  createClassroomList(fileContent: string) {
    const lines = fileContent.split('\n');

    lines.forEach(line => {
      if (!line.trim()) return;

      line = line.replace(/"/g, '');
      const parts = line.split(';');

      const name = parts[0];
      const capacity = parts[1];


      const classroom = new Classroom(name, +capacity);
      this.allClassroom.push(classroom);
    });
    this.sortClassrooms();
  }

  getClassroomList(): Observable<Classroom[]> {
    this.allClassroom.sort((a, b) => b.capacity - a.capacity);
    return of(this.allClassroom);
  }

  sortClassrooms(): void {
    this.allClassroom.sort((a, b) => b.capacity - a.capacity);
  }

  addClassroom(classroom: Classroom): void {
    this.allClassroom.push(classroom)
    this.sortClassrooms()
  }

  deleteClassroom(classroom: Classroom): void {
    this.allClassroom = this.allClassroom.filter(item => item !== classroom);
  }

}
