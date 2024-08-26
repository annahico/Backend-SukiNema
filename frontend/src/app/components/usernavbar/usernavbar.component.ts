import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../../../app/services/app-service.service';


@Component({
  selector: 'app-usernavbar',
  templateUrl: './usernavbar.component.html',
  styleUrls: ['./usernavbar.component.css']
})
export class UsernavbarComponent implements OnInit{
  role:any;

  constructor(private service:AppServiceService){

  }

  ngOnInit(): void {
    console.log('user-navbar ngOnInit says');

    this.service.sendingRoleEmitter.subscribe((data)=>{
      this.role=data.role;
      console.log('user-navbar componenent ngOnInit emitter says-> ', this.role);
    })

    
  }

  
}
