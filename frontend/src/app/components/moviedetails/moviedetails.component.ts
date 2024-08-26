import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppServiceService } from '../../../app/services/app-service.service';


@Component({
  selector: 'app-moviedetails',
  templateUrl: './moviedetails.component.html',
  styleUrls: ['./moviedetails.component.css']
})
export class MoviedetailsComponent implements OnInit{

  movieid:any;
  movie:any;

  constructor(private activatedRoute: ActivatedRoute, private service:AppServiceService,private router:Router){
    
  }

  ngOnInit(): void {

    let role:any;

    this.service.sendingMoviesDetailsRole.subscribe((data)=>{
      role=data.role;
      if(role==-1){
        this.router.navigate(['/']);
      }
      else{
        this.activatedRoute.params.subscribe((params)=>{
          console.log(params);
          this.movieid=params['movieid'];
          console.log(this.movieid);
        })
        
        this.service.getMovie(this.movieid).subscribe((response:any)=>{
          console.log(response);
          this.movie=response.result; 
        })
      }
    })
    this.service.moviesDetailsRole(); 

  }


  


}
