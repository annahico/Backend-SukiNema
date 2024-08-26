import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppServiceService } from 'src/app/services/app-service.service';


@Component({
  selector: 'app-sheetbooking',
  templateUrl: './sheetbooking.component.html',
  styleUrls: ['./sheetbooking.component.css']
})
export class SheetbookingComponent implements OnInit{

  constructor(private activatedRoute:ActivatedRoute, private service:AppServiceService,private router:Router){

  }

  
  movieid:any;
  showid:any;
  cinemaid:any;

  movie:any;
  show:any; 
  cinema:any;

  handler:any=null;

  ngOnInit(): void {

    this.service.sendingSheetBookingRole.subscribe((data)=>{
      let role:any=data.role;
      if(role==-1){
        this.router.navigate(['/']);
      }

      else{
        this.loadStripe();

        this.activatedRoute.params.subscribe((params)=>{
          this.movieid=params['movieid'];
          this.showid=params['showid'];        
          this.cinemaid=params['cinemaid'];
        })
        
        this.service.getMovie(this.movieid).subscribe((response:any)=>{
          this.movie=response.result;
            
          this.service.getShow(this.showid).subscribe((response:any)=>{
            this.show=response.show;      console.log(this.show);

            this.service.getCinema(this.cinemaid).subscribe((response:any)=>{ 
              this.cinema=response.result;     console.log(this.cinema);
            })
          })
        })

      }
    })

    this.service.sheetBookingRole();
  }



  
  sheetrows:any[]=[0,1,2,3,4,5,6,7,8,9];
  sheetcolumns:any[]=[1,2,3,4,5,6,7,8,9,10,11,12];
  tickets:any[]=[];
  stripeToken:any;

  onSubmit(form:any){
    console.log(form.value);    
    console.log(this.tickets);
    this.pay(100*this.ticketCount);
    
  }


  //stripe integration
  pay(amount: any) {    
 
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51MeyA0SEkLm9QFTeKFj2pF7YML9x1TOQ5MlAkQLMjyWAiLNjcIj0M82v7vWIFCHppb6to0n01tudHYqFH5j5QkER00lAg2Y8BJ',
      locale: 'auto',
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        console.log(token);
        alert('Token Created!!'); 
      },
    });

    
 
    handler.open({
      name: 'Doing payment using stripe',
      description: 'Booking tickets for BookMyShow',
      amount: amount * 100
    });
 
  }


  loadStripe() {
     
    if(!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51MeyA0SEkLm9QFTeKFj2pF7YML9x1TOQ5MlAkQLMjyWAiLNjcIj0M82v7vWIFCHppb6to0n01tudHYqFH5j5QkER00lAg2Y8BJ',
          locale: 'auto',
          token: function (token: any) {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
            console.log(token)
            alert('Payment Success!!');
          }
        });
      }
       
      window.document.body.appendChild(s);
    }

  }
  //stripe integration ends

 



  ticketCount=0;
  isDisable=1;

  onClick(event:any,ticketNum:any){

    console.log(event.value); 

    if(event.value==true){ 
      this.ticketCount++;
      this.tickets.push(ticketNum);
    }
    else{
      this.ticketCount--;
      let index=this.tickets.indexOf(ticketNum);
      this.tickets.splice(index,1);
    }

    console.log(this.ticketCount);
    console.log(this.tickets);

    if(this.ticketCount<1 || this.ticketCount>5){
      this.isDisable=1;
    }
    else{
      this.isDisable=0;
    }

  }

}
