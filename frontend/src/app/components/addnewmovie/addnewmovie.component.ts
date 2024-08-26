import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppServiceService } from 'src/app/services/app-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addnewmovie',
  templateUrl: './addnewmovie.component.html',
  styleUrls: ['./addnewmovie.component.css']
})
export class AddnewmovieComponent implements OnInit{
  constructor(private service:AppServiceService,private router:Router,private toastr:ToastrService){

  }

  ngOnInit(): void {
    console.log('add-new-user componenent ngOnInit says');

    this.service.sendingAddRecordRole.subscribe((data)=>{
      if(data.role!=1){
        this.router.navigate(['/movies']);
      }
    })
    this.service.addRecordRole();
  }

  onSubmit(form:any){
    console.log(form.value);
    this.service.addMovie(form.value).subscribe((response)=>{
      console.log(response);
      this.toastr.success('movie added successfully', 'message from website',{timeOut:3000});
      this.router.navigate(['/movies']);
    })
  }

 

}
