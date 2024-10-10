import { Injectable } from '@angular/core';
import { Service } from '../models/service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {



  private allService: Service[] = [];

  constructor() { }

  createServiceList(fileContent: string) {
    const lines = fileContent.split('\r\n');

    lines.forEach(line => {
      if (!line.trim()) return;

      line = line.replace(/"/g, '');
      const parts = line.split(',');

      const courseCode = parts[0];
      const day = parts[1];
      let timings: string[] = [];
      for (let i = 2; i < parts.length; i++) {
        timings.push(parts[i]);
      }

      const service = new Service(courseCode, day, timings);
      this.allService.push(service);
    });
  }

  getServiceList(): Observable<Service[]> {
    return of(this.allService);
  }

  deleteService(service: Service): void {
    this.allService = this.allService.filter(item => item != service)
  }
}
