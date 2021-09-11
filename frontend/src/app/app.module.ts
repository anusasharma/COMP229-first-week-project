import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from "@angular/common/http";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { GamePopupComponent } from './game-popup/game-popup.component';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from "@angular/material/dialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { CustomerPopupComponent } from './customer-popup/customer-popup.component';
import { StopPopupComponent } from './stop-popup/stop-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    GamePopupComponent,
    CustomerPopupComponent,
    StopPopupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    MatDialogModule,
    BrowserAnimationsModule,
  ],
  providers: [], entryComponents:[GamePopupComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
