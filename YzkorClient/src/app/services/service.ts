import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Person } from '../models/person';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Description } from '../models/description';

@Injectable({
  providedIn: 'root'
})
export class LogInService {
  private baseUrl = "https://localhost:44395/api/controller";
  private headers: HttpHeaders;
  constructor(private http: HttpClient) { 
    this.headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
  }
  createPerson (user: Person) : Observable<Person>{
    return this.http.post<Person>(`${this.baseUrl}/addPerson`, user).pipe(map((res) => <Person>res));
  }
 
  addDescription (descrip: Description) : Observable<Description>{
    return this.http.post<Description>(`${this.baseUrl}/addDescription`, descrip).pipe(map((res) =>
    <Description> res), tap((res) => {console.log ('in tap', res)}));
  }
  getPeople(): Observable<Person[]>{
    return this.http.get(this.baseUrl).pipe(map((res) => <Person[]>res));
  }
  getDescripotions(id: number): Observable<Description[]> {
    // let params = new HttpParams({fromObject: {...person}});{params: params}
    return this.http
      .get(`${this.baseUrl}/${id}`)
      .pipe(map((res) => <Description[]>res));
  }
}
