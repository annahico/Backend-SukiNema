import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../../../app/services/app-service.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit{
    role:any;
  constructor(private service:AppServiceService){
      }

  ngOnInit(): void {
    console.log('welcome component ngOnInit says');
    this.service.sendingRoleEmitter.subscribe((data)=>{
      this.role=data.role;
      console.log('welcome componenent ngOnInit emitter says-> ', this.role);
    })
    this.service.setRole();
  }
}
