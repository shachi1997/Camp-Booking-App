import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BookingService } from '../../services/booking.service';
import { Router } from '@angular/router';
import { IBooking } from '../../models/models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book-camp',
  templateUrl: './book-camp.component.html',
  styleUrls: ['./book-camp.component.css']
})
export class BookCampComponent implements OnInit {
  
  booking:IBooking

  BookCampForm: FormGroup;
  AddressControl: FormControl;
  StateControl: FormControl;
  CountryControl: FormControl;
  ZipCodeControl: FormControl;
  PhoneControl: FormControl;

  constructor(
    private BookingService: BookingService,
    private router: Router,
    private toastr: ToastrService
  ) {}

ngOnInit() {
  this.AddressControl = new FormControl('', [Validators.required]);
  this.StateControl = new FormControl('', [Validators.required]);
  this.CountryControl=new FormControl('',[Validators.required]);
  this.ZipCodeControl= new FormControl('',[Validators.required,Validators.maxLength(6),Validators.minLength(6),Validators.pattern("^[0-9]*$")]);
  this.PhoneControl= new FormControl('',[Validators.required,Validators.maxLength(10),Validators.minLength(10),Validators.pattern("^[0-9]*$"),]);

  this.BookCampForm = new FormGroup({
    Address: this.AddressControl,
    State: this.StateControl,
    Country:this.CountryControl,
    ZipCode: this.ZipCodeControl,
    Phone: this.PhoneControl
    
  });
  
}
 //if user clicks on confirm booking button then redirect user to confirmation screen 
//if everything goes well
onFormSubmit(){
  this.booking= {
    BookingID:null,
    BookingReferenceNo:null,
    UserEmailID:localStorage.getItem('emailID'),
    BookedCampID:localStorage.getItem('campID'),
    BillingAddress:this.AddressControl.value,
    State:this.StateControl.value,
    Country:this.CountryControl.value,
    ZipCode:this.ZipCodeControl.value,
    CellPhone:this.PhoneControl.value,
    CheckIn:localStorage.getItem('checkIn'),
    CheckOut:localStorage.getItem('checkOut'),
    TotalAmount:null

  }
 //invoking the service method
  this.BookingService.bookCamp(this.booking)
  .subscribe((confirmBooking:IBooking)=>{ 
    this.router.navigate(['camp/book/confirm'],{  
    state:{
       bookingRefNo: confirmBooking.BookingReferenceNo
    }})
  }, (error)=>{
    this.toastr.warning('Some error has occured', 'Caution!');
        console.log(error)
  });
  
}
get validate(){
  return this.BookCampForm.controls;
}
}
