import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppServiceService } from '../../../app/services/app-service.service';
import { ShowdeletepopupComponent } from '../showdeletepopup/showdeletepopup.component';

@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.css']
})
export class ShowsComponent implements OnInit{

  displayedColumns:string[]=[ 'moviename','cinemaname','screen', 'startscreeningdate','endscreeningdate','screeningtime', 'operations'];

  constructor(private service:AppServiceService,private router:Router, private dailogRef:MatDialog,private toastr:ToastrService){

  }

  shows:any;

  ngOnInit(): void {

    this.service.sendingShowsRole.subscribe((data:any)=>{
      if(data.role!=1){
        this.router.navigate(['/']);
      }
      else{
        this.service.getAllShows().subscribe((response:any)=>{
          this.shows=response.result;
          console.log(this.shows);

          for(let i=0;i<this.shows.length;i++){
            this.service.getCinema(this.shows[i].cinemaid).subscribe((response:any)=>{
              this.shows[i].cinemaname=response.result.name;

              this.service.getMovie(this.shows[i].movieid).subscribe((response:any)=>{
                this.shows[i].moviename=response.result.name;
              })
            })
            console.log(this.shows[i]);
          }
        })

      }
    })

    this.service.showsRole();

  }



  onDelete(showid:any){
    this.dailogRef.open(ShowdeletepopupComponent);

    this.service.sendingDeleteShowMessage.subscribe((data:any)=>{

      if(data.message=='Yes'){
        this.service.deleteShow(showid).subscribe((response:any)=>{
          console.log(response);
          if(response.message){
            this.toastr.success(response.message,'message from website',{timeOut:3000});
          }
          else{
            this.toastr.error(response.error,'message from website',{timeOut:3000});
          }
        })
      }

      this.dailogRef.closeAll();
      this.service.showsRole();
    })
  }
}
