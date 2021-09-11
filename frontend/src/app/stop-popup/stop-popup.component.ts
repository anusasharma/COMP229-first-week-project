import {Component, Inject, Input, OnInit} from '@angular/core';
import {GameDetailsService} from "../service/game-details.service";
import {FormBuilder} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DashboardComponent} from "../dashboard/dashboard.component";

export interface DialogData {
  game: any;
  stop: boolean;
}

@Component({
  selector: 'app-stop-popup',
  templateUrl: './stop-popup.component.html',
  styleUrls: ['./stop-popup.component.css']
})
export class StopPopupComponent implements OnInit {

  booth_name: any;
  customer_name: any;
  amount: any;
  constructor(private gameService: GameDetailsService, private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
    this.booth_name = this.data.game.booth_name;
    this.customer_name = this.data.game.customer_name;
    console.log(this.data.stop)
    if(this.data.stop){
      this.amount = this.data.game.price_per_hour * (this.data.game.ending_time - Date.now()) / (1000 * 60 * 60)
    }
    else if (this.data.game.status == 0){
      this.amount = this.data.game.price_per_hour * (this.data.game.ending_time - this.data.game.starting_time) / (1000 * 60 * 60) ;
    }

  }

  stop(){
      this.gameService.stop(this.data.game.id).subscribe(s=>{
        if(s){

        }
      })
  }

}
