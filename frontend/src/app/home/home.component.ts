import { Component, OnInit } from '@angular/core';
import {GameDetailsService} from "../service/game-details.service";
import {GamePopupComponent} from "../game-popup/game-popup.component";
import {MatDialog} from "@angular/material/dialog";
import {CustomerPopupComponent} from "../customer-popup/customer-popup.component";
import {interval, Subscription} from "rxjs";
import {StopPopupComponent} from "../stop-popup/stop-popup.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  games: any;
  stopButton = false;
  private subscription?: Subscription;
  starting_time: any;
  constructor(private gameService: GameDetailsService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getGameDetails();
    this.gameService.addGame$.subscribe(g=> {
      if(g){
        this.getGameDetails();
        this.gameService.addGame$.next(false)
      }
    })

  }

  getGameDetails(){
    this.gameService.getGameDetails().subscribe( resp => {
        if(resp){
          this.games = resp.data;
          this.subscription = interval(1000)
          .subscribe(x => { this.displayTime(this.games[0]); });
        }
      }
    )
  }

  openDialog(e:any) {
    console.log(e);
    if (e.status == 0){
      const dialogRef =
        this.dialog.open(CustomerPopupComponent, {
          width: '250px',
          data: {id: e.id, name: e.booth_name, price: e.price_per_hour}})

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.getGameDetails();
      });
    }
    else{
      console.log('status')
      this.stopButton = true;
      this.displayTime(e);
    }


  }

  displayTime(game: any){
    if(game.ending_time - Date.now() <= 0 && game.status == 1 || this.stopButton){
      game.status = 0;

      console.log(game)
      const dialogRef = this.dialog.open(StopPopupComponent, {
        width: '250px',
        data: {game: game, stop: this.stopButton}
      });
      this.stopButton = false

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.getGameDetails();
      });
    }

      const timeInMilliSeconds =  (game.ending_time - Date.now());
      const milliseconds = (timeInMilliSeconds % 1000) / 100;
      let seconds = Math.floor((timeInMilliSeconds / 1000) % 60);
      let minutes = Math.floor((timeInMilliSeconds / (1000 * 60)) % 60);
      let hours = Math.floor((timeInMilliSeconds / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? 0 + hours : hours;
    minutes = (minutes < 10) ? 0 + minutes : minutes;
    seconds = (seconds < 10) ? 0 + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;


    // const hours = timeInMilliSeconds/360000;
    // const minutes = (timeInMilliSeconds%3600) / 60;
    // const seconds = (timeInMilliSeconds%3600) / 1000;

  }


}
