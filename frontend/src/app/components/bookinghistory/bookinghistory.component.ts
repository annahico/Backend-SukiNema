import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppServiceService } from '../../../app/services/app-service.service';

@Component({
  selector: 'app-bookinghistory',
  templateUrl: './bookinghistory.component.html',
  styleUrls: ['./bookinghistory.component.css']
})
export class BookinghistoryComponent implements OnInit {

  displayedColumns: string[] = ['id', 'userid', 'movieid', 'cinemaid', 'showid', 'seatnumber'];

  constructor(
    private service: AppServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  role: string = '';
  user: any;
  bookings: any;

  ngOnInit(): void {
    this.service.sendingBookingHistoryRole.subscribe((data: any) => {
      if (data.role === -1) {
        this.router.navigate(['/']);
      } else {
        const userid = this.activatedRoute.snapshot.params['userid'];

        this.service.getBookingHistory(userid).subscribe((response: any) => {
          if (response.error) {
            this.toastr.error(response.error, 'Message from website', { timeOut: 3000 });
            this.router.navigate(['/']);
          } else {
            this.bookings = response.result;
            console.log(this.bookings);

            this.service.getUser(userid).subscribe((response: any) => {
              this.user = response.result[0];
              if (this.user.role === true) {
                this.role = 'admin';
              } else {
                this.role = 'user';
              }

              console.log(this.user);
            });
          }
        });
      }
    });

    // Reemplaza emitBookingHistoryRole con bookingHistoryRole
    this.service.bookingHistoryRole();
  }
}
