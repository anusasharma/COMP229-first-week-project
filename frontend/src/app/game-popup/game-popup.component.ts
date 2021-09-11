import {Component, Inject, OnInit} from '@angular/core';
import {GameDetails} from "../models/game-details.model";
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {GameDetailsService} from "../service/game-details.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DashboardComponent} from "../dashboard/dashboard.component";
import {BehaviorSubject} from "rxjs";
// import {NotificationService} from "../service/notification.service";

export interface DialogData {
  animal: string;
  name: string;
}

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-game-popup',
  templateUrl: './game-popup.component.html',
  styleUrls: ['./game-popup.component.css']
})
export class GamePopupComponent implements OnInit {


  gameForm = new FormGroup({});
  submitted = false;
  gameObj: GameDetails = new GameDetails;
  closeResult: string = '';
  selectedFile?: ImageSnippet;

  constructor(private gameService: GameDetailsService, private formBuilder: FormBuilder, public dialogRef: MatDialogRef<DashboardComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData, ) { }



  ngOnInit(): void {
    this.gameForm = this.formBuilder.group({
      boothName: ['', [Validators.required]],
      pricePerHour: ['', [Validators.required]],
      specialFeature: '',
      image: ''
    });
  }

  get f() { return this.gameForm.controls; }

  // private validateBoothName(): ValidatorFn {
  //   return (control: AbstractControl): {[key: string]: any} => {
  //     return this.gameService.getGameDetails()
  //       .subscribe(
  //         ({data}) => {
  //           console.log(data)
  //
  //           let res: string = data.filter;
  //           if (res === control.value) {
  //             return {'alreadyExist': true};
  //           } else {
  //             return null;
  //           }
  //         },
  //         (error) => {
  //           console.log(error);
  //         }
  //       );
  //   }
  // }
  // showToasterSuccess(){
  //   this.notifyService.showSuccess('The information has been added successfully', 'Success')
  // }


  save(): void {

    if(this.gameForm.valid){
   this.gameObj   = new GameDetails();

   this.gameObj.booth_name                = this.gameForm?.get('boothName')?.value;
   this.gameObj.price_per_hour            = this.gameForm?.get('pricePerHour')?.value;
   this.gameObj.special_feature           = this.gameForm?.get('specialFeature')?.value;
   this.gameObj.image                     = this.gameForm?.get('image')?.value;



   this.gameService.addGameDetails(this.gameObj).subscribe( resp => {
     if(resp){
       // this.gameService.getGameDetails().subscribe(
       //         data => {
       //
       //         })


       if(this.selectedFile){
         this.gameService.uploadImage(this.selectedFile, resp.data.insertId).subscribe(
           (res) => {
             this.gameService.addGame$.next(true);
             this.dialogRef.close();
             // this.showToasterSuccess()
           },
           (err) => {

           })
       }
       this.gameService.addGame$.next(true);
       this.dialogRef.close();
       // this.showToasterSuccess()

     }
   })
 }

    //this.toastr.successToastr('The information has been added successfully', 'Success');


  }
  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {


      this.selectedFile = new ImageSnippet(event.target.result, file);

    });

    reader.readAsDataURL(file);
  }
}
