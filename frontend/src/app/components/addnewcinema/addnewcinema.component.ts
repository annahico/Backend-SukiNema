import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppServiceService } from '../../../app/services/app-service.service';

interface RoleData {
  role: number;
}

@Component({
  selector: 'app-addnewcinema',
  templateUrl: './addnewcinema.component.html',
  styleUrls: ['./addnewcinema.component.css']
})
export class AddnewcinemaComponent implements OnInit {

  role: number = -1; // Inicialización en la declaración

  constructor(private router: Router, private service: AppServiceService, private toastr: ToastrService) { }

  ngOnInit(): void {
    console.log('add-new-user component ngOnInit says');
    this.service.sendingAddRecordRole.subscribe((data: RoleData) => {
      this.role = data.role;
      if (this.role !== 1) {
        this.router.navigate(['/']);
      }
    });
    this.service.addRecordRole();
  }

  onSubmit(form: any): void {
    console.log(form.value);
    this.service.addCinema(form.value).subscribe((response: any) => {
      console.log(response);
      this.toastr.success('Cinema added successfully', 'Message from website', { timeOut: 3000 });
      this.router.navigate(['/cinemas']);
    });
  }
}
