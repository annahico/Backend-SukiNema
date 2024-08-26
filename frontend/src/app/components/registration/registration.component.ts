import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppServiceService } from '../../../app/services/app-service.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit{

  constructor(private service: AppServiceService,private router:Router,private toastr:ToastrService){ 

  }
  
  ngOnInit(): void {
    
  }

  registerform=new FormGroup({
    name: new FormControl('',[Validators.required, Validators.minLength(3)]),
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(8), Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$")])
  });


  onSubmit(){

    //calling service to register the user
    this.service.registration(this.registerform.value).subscribe((response:any)=>{
      console.log(response);

      if(response.message!=null){
        this.toastr.success(response.message,'message from website',{timeOut:3000});
        // this.registerform.reset();
      }
      else{
        this.toastr.error(response.error,'message from website',{timeOut:3000});
      }
      this.router.navigate(['/login']);
    });

 }

}
