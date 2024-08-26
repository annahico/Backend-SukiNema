import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppServiceService } from '../../../app/services/app-service.service';

@Component({
  selector: 'app-selectcinema',
  templateUrl: './selectcinema.component.html',
  styleUrls: ['./selectcinema.component.css']
})
export class SelectcinemaComponent implements OnInit{

  constructor(private activatedRoute: ActivatedRoute,private service:AppServiceService,private router:Router){

  }


  movieid:any;
  movie:any;
  shows:any;


  ngOnInit(): void {
    
    this.service.sendingSelectCinemaRole.subscribe((data)=>{
      let role:any=data.role;
      if(role==-1){
        this.router.navigate(['/']);
      }
      else{
        this.activatedRoute.params.subscribe((params)=>{
          console.log(params);
          this.movieid=params['movieid'];
        })

        this.service.getMovie(this.movieid).subscribe((response:any)=>{
          this.movie=response.result;

          this.service.getShows(this.movieid).subscribe((response:any)=>{
            this.shows=response.shows;
            console.log('displaying shows \n', this.shows);

            for(let i=0;i<this.shows.length;i++){
              this.service.getCinema(this.shows[i].cinemaid).subscribe((response:any)=>{
                this.shows[i].cinemaname=response.result.name;
                this.shows[i].cinemaaddress=response.result.address;
                this.shows[i].cinemacity=response.result.city;
                this.shows[i].cinemaid=response.result.id;
              })
            }
          })
        })
      }
    })

    this.service.selectCinemaRole();

  }

  
}
