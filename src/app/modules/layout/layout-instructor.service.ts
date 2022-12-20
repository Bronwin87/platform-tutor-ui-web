import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LayoutInstructorService {
  constructor(private http: HttpClient) {}

  getCourses() {
    return this.http.get<any[]>(environment.apiHost + 'owned-courses');
  }
}
