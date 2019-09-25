import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DrawComponent} from './draw/draw.component';
import {InputUserDataFormComponent} from './input-user-data-form/input-user-data-form.component';
import {DisplayUserDataComponent} from './display-user-data/display-user-data.component';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


const routes: Routes = [
  { path: 'draw', component: DrawComponent },
  {path:'', component: InputUserDataFormComponent},
  {path:'user/:uid', component:DisplayUserDataComponent}


];

@NgModule({
  imports: [BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
