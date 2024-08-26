import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppServiceService } from '../../../app/services/app-service.service';

@Component({
  selector: 'app-cinemadetails',
  templateUrl: './cinemadetails.component.html',
  styleUrls: ['./cinemadetails.component.css']
})
export class CinemadetailsComponent implements OnInit{
  constructor(private activatedRoute:ActivatedRoute, private service:AppServiceService,private router:Router){

  }

  cinema:any;
  shows:any;

  ngOnInit(): void {
    let role;
  
    this.service.sendingCinemaDetailRole.subscribe((data)=>{
      role=data.role;
      if(role==-1){
        this.router.navigate(['/']);
      }
      else{
        const cinemaid:any=this.activatedRoute.snapshot.params['cinemaid'];

        this.service.getCinema(cinemaid).subscribe((response:any)=>{
          this.cinema=response.result;

          this.service.getShowsByCinemaid(cinemaid).subscribe((response:any)=>{
            this.shows=response.result;

            for(let i=0;i<this.shows.length;i++){
              this.service.getMovie(this.shows[i].movieid).subscribe((response:any)=>{
                this.shows[i].moviename=response.result.name;
                this.shows[i].moviereleaseddate=response.result.releaseddate;
                this.shows[i].moviedescrp=response.result.descrp;
              })
              console.log(this.shows[i]);
            }
          })
        })
      }
    })

    this.service.cinemaDetailsRole();
  }

}
