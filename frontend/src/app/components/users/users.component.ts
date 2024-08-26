import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppServiceService } from '../../../app/services/app-service.service';
import { DeletepopupComponent } from '../deletepopup/deletepopup.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{

  displayedColumns:string[]=['id', 'name', 'email','Role', 'operations'];

  constructor(private service:AppServiceService,private router:Router,private dialogRef:MatDialog,private toastr:ToastrService){
  }


  usersList:any[]=[];
  role:any;

  ngOnInit(): void {
    console.log('users componenent ngOnInit says');
    this.service.sendingUsersRole.subscribe((data)=>{
      this.role=data.role;
      console.log('users componenent ngOnInit emitter says', this.role);
      if(this.role!=1){
        this.router.navigate(['/']);
      }
      else{
        this.service.getUsers().subscribe((response:any)=>{
          console.log('users component', response);
          if(response.error!=null){
            this.router.navigate(['/']);
          }
          else{
            this.usersList=response.result;
            console.log(this.usersList);
          }
        })
      }
    })
    this.service.usersRole();  
  }

  onDelete(id:any){
    this.dialogRef.open(DeletepopupComponent);
        this.service.sendingDeleteMessage.subscribe((response)=>{
      if(response.message=='Yes'){
        this.service.deleteUser(id).subscribe((response:any)=>{
          console.log(response.message);
          this.dialogRef.closeAll();
          this.toastr.success('user successfully deleted','message from website', {timeOut:3000});
          this.service.usersRole();
        })
      }
      else{
        this.dialogRef.closeAll();
      }
    })
      }
}
