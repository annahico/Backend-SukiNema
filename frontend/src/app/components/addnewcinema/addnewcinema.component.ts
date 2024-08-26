import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppServiceService } from '../../../app/services/app-service.service';

@Component({
  selector: 'app-addnewcinema',
  templateUrl: './addnewcinema.component.html',
  styleUrls: ['./addnewcinema.component.css']
})
export class AddnewcinemaComponent implements OnInit{
  constructor(private router:Router, private service:AppServiceService,private toastr:ToastrService){

  }

  role:any;
  ngOnInit(): void {

    console.log('add-new-user componenent ngOnInit says');
    this.service.sendingAddRecordRole.subscribe((data)=>{
      this.role=data.role;
      if(this.role!=1){
        this.router.navigate(['/']);
      }    
    })
    this.service.addRecordRole();
  }


  onSubmit(form:any){
    console.log(form.value);
    this.service.addCinema(form.value).subscribe((response:any)=>{
      console.log(response);
      this.toastr.success('cinema added successfully ','message from website', {timeOut:3000});
      this.router.navigate(['/cinemas']);
    })
  }

}
