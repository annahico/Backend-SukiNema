import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppServiceService } from '../../../app/services/app-service.service';

@Component({
  selector: 'app-editmovie',
  templateUrl: './editmovie.component.html',
  styleUrls: ['./editmovie.component.css']
})
export class EditmovieComponent implements OnInit{
  constructor(private service:AppServiceService, private router:Router,private activatedRoute:ActivatedRoute,private toastr:ToastrService){

  }

  form=new FormGroup({
    name: new FormControl('',[Validators.required]),
    releaseddate: new FormControl('',[Validators.required]),
    descrp: new FormControl('',[Validators.required]),
    movieposter: new FormControl('',[Validators.required])
  });

  ngOnInit(): void {

    this.service.sendingEditMovieRole.subscribe((data)=>{
      if(data.role!=1){
        this.router.navigate(['/movies']);
      }
      else{
        let id=this.activatedRoute.snapshot.params['id'];
        console.log('edit movie id:',id);

        this.service.getMovie(id).subscribe((response:any)=>{
          console.log(response);
          let movie=response.result;

          this.form=new FormGroup({
            name: new FormControl(movie.name,[Validators.required]),
            releaseddate: new FormControl(movie.releaseddate,[Validators.required]),
            descrp: new FormControl(movie.descrp,[Validators.required]),
            movieposter: new FormControl(movie.movieposter,[Validators.required])
          });
        })

      }
    })

    this.service.editMovieRole();

  }

  onSubmit(){
    console.log(this.form.value);

    let movieid=this.activatedRoute.snapshot.params['id'];
    this.service.editMovie(movieid,this.form.value).subscribe((response:any)=>{
      console.log(response);
      this.toastr.success('movie updated successfully','message from website',{timeOut:3000});
      this.router.navigate(['/movies']);
    })
  }



}
