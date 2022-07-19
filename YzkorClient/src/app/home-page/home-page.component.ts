import { Component, OnInit } from '@angular/core';
import { Person } from '../models/person';
import { LogInService } from '../services/service';
import { AbstractControl, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  
people: Person[] = [];
filterOptions: Person[] = [];

constructor(private service: LogInService, private fb: FormBuilder, 
    private routes: Router) {
     }
  ngOnInit(): void {
    this.service.getPeople().subscribe((p)=>{this.people = p; this.filterOptions = this.people});
  }
  registration(){
    this.routes.navigate(['/registration'])
  }
  filter(value: string){
    debugger;
    let filterByNames: Person[];
    if(value!=''){
      filterByNames = this.people.filter(p => p.firstName.includes(value));
      this.filterOptions = filterByNames;
    }
    else{
      this.filterOptions = this.people;
    }
  }
}
