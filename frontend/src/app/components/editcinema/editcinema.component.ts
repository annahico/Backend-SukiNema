import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppServiceService } from '../../services/app-service.service';

@Component({
  selector: 'app-editcinema',
  templateUrl: './editcinema.component.html',
  styleUrls: ['./editcinema.component.css']
})
export class EditcinemaComponent implements OnInit{

  constructor(private service:AppServiceService,private activatedRoute:ActivatedRoute,private router:Router,private toastr:ToastrService){

  }

  role:any;

  cinema:any;
  myform:any=new FormGroup({
    name: new FormControl('',[Validators.required]),
    address:new FormControl('',[Validators.required]),
    contactnumber: new FormControl('',[Validators.required]),
    website: new FormControl(''),
    screens: new FormControl('', [Validators.required]),
    showsavailabilitytime: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
      
    console.log('edit-cinema componenent ngOnInit says');
      
    this.service.sendingEditCinemaRole.subscribe((data)=>{
      this.role=data.role;
      console.log('edit cinema role :',this.role);
      if(this.role!=1){
        this.router.navigate(['/']);
      }    
      else{
        let id=this.activatedRoute.snapshot.params['id'];

        this.service.getCinema(id).subscribe((response:any)=>{
          this.cinema=response.result;
          console.log('editing cinema is', this.cinema);
          
          this.myform=new FormGroup({
            name: new FormControl(this.cinema.name,[Validators.required]),
            address:new FormControl(this.cinema.address,[Validators.required]),
            contactnumber: new FormControl(this.cinema.contactnumber,[Validators.required]),
            website: new FormControl(this.cinema.website),
            screens: new FormControl(this.cinema.screens, [Validators.required]),
            showsavailabilitytime: new FormControl(this.cinema.showsavailabilitytime, [Validators.required]),
          });

        })
      
      }
    })
    this.service.editCinemaRole();
  }


  onSubmit(){
    console.log(this.myform.value);

    this.activatedRoute.params.subscribe((params)=>{
      let cinemaid=params['id'];
      this.service.editCinema(cinemaid,this.myform.value).subscribe((response)=>{
        console.log(response);
        this.toastr.success('cinema updated successfully ','message from website', {timeOut:3000});
        this.router.navigate(['/cinemas']);
      })
    })
  }

  
}
