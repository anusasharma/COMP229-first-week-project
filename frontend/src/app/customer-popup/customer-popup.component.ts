import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GameDetailsService} from "../service/game-details.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DashboardComponent} from "../dashboard/dashboard.component";
import {GamePopupComponent} from "../game-popup/game-popup.component";
import {StopPopupComponent} from "../stop-popup/stop-popup.component";

export interface DialogData {
  id: number;
  boothName: any;
  pricePerHour: any;
}


@Component({
  selector: 'app-customer-popup',
  templateUrl: './customer-popup.component.html',
  styleUrls: ['./customer-popup.component.css']
})
export class CustomerPopupComponent implements OnInit {
  customerForm = new FormGroup({});
  starting_time: any;
  ending_time: any;
  timer = false;
  totalAmount: any;

  constructor(private gameService: GameDetailsService, private formBuilder: FormBuilder,  public dialogRef: MatDialogRef<DashboardComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      customerName: ['', [Validators.required]],
      hours: ['', [Validators.required]]
    });
  }

  begin(){
    this.starting_time = Date.now();
    this.ending_time = this.starting_time + this.customerForm.get('hours')?.value * 60 * 60 *1000;

    const obj = {
      customer_name: this.customerForm.get('customerName')?.value,
      starting_time: this.starting_time,
      ending_time: this.ending_time,
      status: 1
    }

    this.totalAmount = this.data.pricePerHour * this.customerForm.get('hours')?.value;

    this.gameService.updateCustomerDetails(obj, this.data.id).subscribe(data =>{
      if(data){

        // this.dialogRef.afterClosed().subscribe(result => {
        //   console.log('The dialog was closed');

        // });
      }
    })

  }
}
