import { Component } from '@angular/core';
import { AppServiceService } from '../../../app/services/app-service.service';

@Component({
  selector: 'app-deletepopup',
  templateUrl: './deletepopup.component.html',
  styleUrls: ['./deletepopup.component.css']
})
export class DeletepopupComponent {
  
  constructor(private service:AppServiceService){

  }

  delete(message:any){
    console.log(message);
    this.service.emitDeleteMessage(message);
  }
}
