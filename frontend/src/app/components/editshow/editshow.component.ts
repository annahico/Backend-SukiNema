import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppServiceService } from '../../services/app-service.service';

@Component({
  selector: 'app-editshow',
  templateUrl: './editshow.component.html',
  styleUrls: ['./editshow.component.css']
})
export class EditshowComponent implements OnInit{
  constructor(private activatedRoute:ActivatedRoute, private service:AppServiceService, private router:Router,private toastr:ToastrService){

  }

  form=new FormGroup({
    moviename: new FormControl('',[Validators.required]),
    cinemaname: new FormControl('',[Validators.required]),
    screen: new FormControl('',[Validators.required]),
    startscreeningdate: new FormControl('',[Validators.required]),
    endscreeningdate: new FormControl('',[Validators.required]),
    screeningtime: new FormControl('',[Validators.required]),
  });

  showid:any;
  show:any;

  ngOnInit(): void {

    this.service.sendingEditShowRole.subscribe((data:any)=>{
      if(data.role!=1){
        this.router.navigate(['/']);
      }
      else{
        this.showid=this.activatedRoute.snapshot.params['showid'];

        this.service.getShow(this.showid).subscribe((response:any)=>{
          this.show=response.show;
          console.log(this.show);

          this.form=new FormGroup({
            moviename: new FormControl(this.show.moviename,[Validators.required]),
            cinemaname: new FormControl(this.show.cinemaname,[Validators.required]),
            screen: new FormControl(this.show.screen,[Validators.required]),
            startscreeningdate: new FormControl(this.show.startscreeningdate,[Validators.required]),
            endscreeningdate: new FormControl(this.show.endscreeningdate,[Validators.required]),
            screeningtime: new FormControl(this.show.screeningtime,[Validators.required]),
          });

        })
      }
    })

    this.service.editShowRole();

  }

  onSubmit(){
    console.log(this.form.value);
    this.service.editShow(this.showid,this.form.value).subscribe((response:any)=>{
      console.log(response);

      if(response.message){
        this.toastr.success(response.message, 'message from website', {timeOut:3000});
      }
      else{
        this.toastr.error(response.error, 'message from website', {timeOut:3000});
      }
      this.router.navigate(['/shows']);
    })
  }
}
