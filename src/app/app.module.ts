import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  MatToolbarModule
} from "@angular/material";

import { AppComponent } from './app.component';
import { DrawComponent } from './draw/draw.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app.routing.module';
import {InputUserDataFormComponent} from './input-user-data-form/input-user-data-form.component';
import {DisplayUserDataComponent} from './display-user-data/display-user-data.component';
import {HeaderComponent} from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    DrawComponent,
    InputUserDataFormComponent,
    DisplayUserDataComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatToolbarModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
