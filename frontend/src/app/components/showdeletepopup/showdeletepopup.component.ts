import { Component } from '@angular/core';
import { AppServiceService } from '../../services/app-service.service';

@Component({
  selector: 'app-showdeletepopup',
  templateUrl: './showdeletepopup.component.html',
  styleUrls: ['./showdeletepopup.component.css']
})
export class ShowdeletepopupComponent {
  constructor(private service:AppServiceService){

  }
  
  delete(msg:any){
    console.log(msg);

    this.service.emitDeleteShowMessage(msg);
  }
}
