import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DrawComponent } from './draw/draw.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app.routing.module';
import {InputUserDataFormComponent} from './input-user-data-form/input-user-data-form.component';
import {DisplayUserDataComponent} from './display-user-data/display-user-data.component';

@NgModule({
  declarations: [
    AppComponent,
    DrawComponent,
    InputUserDataFormComponent,
    DisplayUserDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
