import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppServiceService } from '../../../app/services/app-service.service';
import { MoviedeletepopupComponent } from '../moviedeletepopup/moviedeletepopup.component';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  displayedColumns:string[]=['movieposter', 'name', 'releaseddate','descrp','operations'];

  constructor(private service:AppServiceService,private router:Router,private dialogRef:MatDialog,private toastr:ToastrService){

  }


  moviesList:any[]=[];
  role:any;

  ngOnInit(): void {
    console.log('movies componenent ngOnInit says');
    
    this.service.sendingMoviesRole.subscribe((data)=>{
      this.role=data.role;
      console.log('movies componenent ngOnInit emitter says', this.role);

      if(this.role==-1){
        this.router.navigate(['/']);
      }
      else{
        console.log(this.role);
        this.service.getMovies().subscribe((response:any)=>{
          console.log('movies component', response);
          if(response.error!=null){
            this.router.navigate(['/']);
          }
          else{
            this.moviesList=response.moviesList;
            console.log(this.moviesList);
          }
        })
      }
    })
    this.service.moviesRole();  
  }


  onDelete(id:any){
    this.dialogRef.open(MoviedeletepopupComponent);

    this.service.sendingDeleteMovieMessage.subscribe((data)=>{
      if(data.message=='No'){
        this.dialogRef.closeAll();
      }
      else{
        this.service.deleteMovie(id).subscribe((response)=>{
          console.log(response);
          this.dialogRef.closeAll();
          this.toastr.success('movie deleted successfully','message from website',{timeOut:3000});
          this.service.moviesRole();
          
        })
      }
    })
  }


  

 





}
