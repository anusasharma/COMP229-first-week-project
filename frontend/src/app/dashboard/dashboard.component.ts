import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GameDetails} from "../models/game-details.model";
import {GameDetailsService} from "../service/game-details.service";

import { ToastrModule } from 'ngx-toastr';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {GamePopupComponent} from "../game-popup/game-popup.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  animal: any;
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(GamePopupComponent, {
      width: '250px',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });

    // dialogRef.disableClose = true;
    //   dialogRef.backdropClick().subscribe(() => {
    //   // Close the dialog
    //   dialogRef.close();
    // })
  }



}
