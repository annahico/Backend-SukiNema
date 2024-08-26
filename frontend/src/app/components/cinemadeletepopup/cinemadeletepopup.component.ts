import { Component } from '@angular/core';
import { AppServiceService } from '../../../app/services/app-service.service';

@Component({
  selector: 'app-cinemadeletepopup',
  templateUrl: './cinemadeletepopup.component.html',
  styleUrls: ['./cinemadeletepopup.component.css']
})
export class CinemadeletepopupComponent {
  constructor(private service:AppServiceService){

  }

  delete(message:any){
    console.log(message);
    this.service.emitDeleteCinemaMessage(message);
  }
  
}
