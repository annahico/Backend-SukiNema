import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppServiceService } from '../../services/app-service.service';

@Component({
  selector: 'app-addnewshow',
  templateUrl: './addnewshow.component.html',
  styleUrls: ['./addnewshow.component.css']
})
export class AddnewshowComponent implements OnInit{

  constructor(private service:AppServiceService, private toastr:ToastrService,private router:Router){

  }

  cinemas:any;
  movies:any;

  ngOnInit(): void {
    this.service.sendingAddRecordRole.subscribe((data:any)=>{
      if(data.role!=1){
        this.router.navigate(['/']);
      }
      else{
        this.service.getCinemas().subscribe((response:any)=>{
          this.cinemas=response.result;

          this.service.getMovies().subscribe((response:any)=>{
            this.movies=response.moviesList;
          })
        })
      }
    })
    this.service.addRecordRole();
  }



  selectedCinema:any;
  screensInSelectedCinema:any;
  showsavailabilitytimeInSelectedCinema:any;


  onClick(event:any){
    console.log(event.value);

    if(event.value.length==0)
      return;

    this.service.getCinemaByName(event.value).subscribe((response:any)=>{
      this.selectedCinema=response.result;
      console.log(this.selectedCinema);

      this.screensInSelectedCinema=this.selectedCinema.screens;
      console.log(this.screensInSelectedCinema);
      this.screensInSelectedCinema=Array(this.screensInSelectedCinema);
      console.log(this.screensInSelectedCinema);

      this.showsavailabilitytimeInSelectedCinema=this.selectedCinema.showsavailabilitytime;  
      this.showsavailabilitytimeInSelectedCinema=this.showsavailabilitytimeInSelectedCinema.split(',');
      console.log(this.showsavailabilitytimeInSelectedCinema);      
    })
  }




  onSubmit(form:any){
    console.log(form.value);

    
    this.service.addShow(form.value).subscribe((response:any)=>{
      console.log(response);

      if(response.error){
        this.toastr.error(response.error,'message from website', {timeOut:3000});
        this.router.navigate(['/shows']);
      }
      else{
        this.toastr.success(response.message,'message from website',{timeOut:3000});
        this.router.navigate(['/shows']);
      }
    })
  }

}
