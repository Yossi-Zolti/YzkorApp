import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { LogInService } from './services/service';
import { HttpClientModule } from '@angular/common/http';
import { MemoryPageComponent } from './memory-page/memory-page.component';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
   
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
const routes: Routes = [
  {path: "memoryPage" , component: MemoryPageComponent},
  {path: "registration" , component: RegistrationComponent},
  {path: "homePage", component: HomePageComponent},
  { path: '', redirectTo: 'homePage', pathMatch: 'full' }
]
@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    MemoryPageComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
