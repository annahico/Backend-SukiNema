import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppServiceService } from '../app/services/app-service.service';

interface Student{
  id: number;
  name: string;
  email: string;
  mobile: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit{

  constructor(private service: AppServiceService, private toastr:ToastrService){
    
  }

  ngOnInit(): void {
    this.toastr.success('hello there','message from website',{timeOut:1000, });

    this.getDataFromAPI();
  }

  getDataFromAPI(){
    this.service.getData().subscribe((response)=>{
      console.log('Response from api is-->', response);
    });
  }  

  

















  
                                        // angular material just for paratice
  // title = 'frontend';



  // badges

  // notifi=3;




  // progress spinner

  // showSpinner=false;

  // loadData(){
  //   this.showSpinner=true;
  //   setTimeout(()=>{
  //     this.showSpinner=false;
  //   },5000);
  // }




  //progress bar->it is related to progress spinner
  // showBar=false;

  // onClick(){
  //   this.showBar=true;
  //   setTimeout(()=>{
  //     this.showBar=false;
  //   },5000);
  // }




  //sidenav

  // isOpen=false;

  // log(event:any){
  //   console.log(event);
  // }


 

  // students:Student[]=[
  //   {
  //     id:1, name:"manu", email:"manu@gmail.com",mobile:"19993456789"
  //   },
  //   {
  //     id:1, name:"manu", email:"manu@gmail.com",mobile:"19993456789"
  //   },
  //   {
  //     id:1, name:"manu", email:"manu@gmail.com",mobile:"19993456789"
  //   },
  //   {
  //     id:1, name:"manu", email:"manu@gmail.com",mobile:"19993456789"
  //   }
  // ];
  
  // dataSource=this.students;
  // displayedColumns:string[]=['id', 'name', 'email','mobile','operations'];
  
  

  // isshow=0;


}
