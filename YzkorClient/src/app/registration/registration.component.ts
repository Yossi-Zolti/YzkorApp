declare var require: any
import { Component, OnInit } from '@angular/core';
import { Person } from '../models/person';
import { LogInService } from '../services/service';
import { AbstractControl, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
 
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  person: Person;
  form: FormGroup = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    password: new FormControl(''),
    acceptTerms: new FormControl(false),
  });
  submitted = false;
  constructor(private myService: LogInService, private fb: FormBuilder, 
    private routes: Router) {
    this.person = new Person();
   }
  

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        firstname: ['', Validators.required],
        lastname: [
          '',
          [
            Validators.required
          ]
        ],
        age: ['',[Validators.required]],
      },
    );
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  onClickSubmit(data: any){
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
      this.person.firstName = data.firstname;
      this.person.lastName = data.lastname;
      this.person.age = data.age;
      this.myService.createPerson(this.person).subscribe((p) => {this.person.id = p.id;
        this.routes.navigate(['/memoryPage'], {state: {data: this.person}});});
  }
}
