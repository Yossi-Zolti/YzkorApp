import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Person } from '../models/person';
import { Description } from '../models/description';
import { LogInService } from '../services/service';
import { Observable, ReplaySubject, Subscriber } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-memory-page',
  templateUrl: './memory-page.component.html',
  styleUrls: ['./memory-page.component.css']
})
export class MemoryPageComponent implements OnInit {
  form: FormGroup = new FormGroup({
    content: new FormControl(''),
    file: new FormControl('')
  })
  private baseUrl = "https://localhost:44395/api/controller";
  person!: Person;
  people: Person[] = [];
  private description: Description;
  private fileToUpload: any;
  private reader: any;
  myImage!: Observable<any>;
  base64Code!: any;
  descriptions: Description[] = [];
  constructor(private http: HttpClient, private service:LogInService,
     private _sanitizer: DomSanitizer, private activatedRoute: ActivatedRoute,
     private routes: Router ) {
    this.description = new Description();
   }

  ngOnInit(): void {
    this.person = history.state.data;
    this.service.getDescripotions(this.person.id).subscribe((d)=>this.descriptions = d);
  }
  uploadFile(e: any){
    this.fileToUpload = e?.target?.files[0];
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(this.fileToUpload , subscriber);
    });
    observable.subscribe((d) => {
      this.myImage = d;
      this.base64Code = d;
    })
  }
  readFile(fileToUpload: any, subscriber: Subscriber<any>) {
    this.reader = new FileReader();
    this.reader.readAsDataURL(fileToUpload);
    this.reader.onload = () => {
      subscriber.next(this.reader.result);
      subscriber.complete();
    }
  }
  submit(data: any){
    this.description.content = data.content;
    this.description.file = this.base64Code; 
    this.description.personId = this.person.id;
    this.service.addDescription(this.description).subscribe((_) => {});
    }
  showDescriptions(){
    this.service.getDescripotions(this.person.id).subscribe((d)=>this.descriptions = d);
  }
}
