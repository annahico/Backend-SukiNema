import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppServiceService } from '../../services/app-service.service';
import { CinemadeletepopupComponent } from '../cinemadeletepopup/cinemadeletepopup.component';

@Component({
  selector: 'app-cinemas',
  templateUrl: './cinemas.component.html',
  styleUrls: ['./cinemas.component.css']
})
export class CinemasComponent implements OnInit{

  displayedColumns:string[]=[ 'name', 'address','contactnumber' ,'website', 'screens', 'showsavailabilitytime','operations'];

  constructor(private service:AppServiceService,private router:Router,private dialogRef:MatDialog,private toastr:ToastrService){

  }


  cinemasList:any[]=[];
  role:any;

  ngOnInit(): void {

    console.log('cinemas componenent ngOnInit says');

    
    this.service.sendingCinemasRole.subscribe((data)=>{
      this.role=data.role;
      if(this.role==-1){
        this.router.navigate(['/']);
      }       
      else{
        this.service.getCinemas().subscribe((response:any)=>{
          console.log('cinemas component', response);
          if(response.error!=null){
            this.router.navigate(['/']);
          }
          else{
            this.cinemasList=response.result;
            console.log(this.cinemasList);
          }
        })
      }
    })
    this.service.cinemasRole();
    
    
  }


  onDelete(id:any){
    this.dialogRef.open(CinemadeletepopupComponent);

    this.service.sendingDeleteCinemaMessage.subscribe((response)=>{
      if(response.message=='Yes'){
        this.service.deleteCinema(id).subscribe((response:any)=>{
          console.log(response.message);
          this.dialogRef.closeAll();
          this.toastr.success('cinema successfully deleted','message from website', {timeOut:3000});
          this.service.cinemasRole();
        })
      }
      else{
        this.dialogRef.closeAll();
      }
    })
  }




}
