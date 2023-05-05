import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { IBooking } from '../../models/models';

@Component({
  selector: 'app-booking-confirm',
  templateUrl: './booking-confirm.component.html',
  styleUrls: ['./booking-confirm.component.css']
})
export class BookingConfirmComponent implements OnInit {
  bookingRefNo: string;
  billingAddress: string;
  state: string;
  country: string;
  zipCode: string;
  phone: string;
  price: string;
  checkIn: string;
  checkOut: string;

  constructor(
    private BookingService: BookingService
  ) { }

  ngOnInit(): void {
    this.bookingRefNo = window.history.state.bookingRefNo

    this.BookingService.confirmBooking(this.bookingRefNo).subscribe((booking: IBooking) => {
      this.bookingRefNo = booking.BookingReferenceNo
      this.billingAddress = booking.BillingAddress,
        this.state = booking.State,
        this.country = booking.Country,
        this.zipCode = booking.ZipCode,
        this.phone = booking.CellPhone,
        this.price = booking.TotalAmount,
        this.checkIn = booking.CheckIn,
        this.checkOut = booking.CheckOut

      localStorage.removeItem('checkIn')
      localStorage.removeItem('checkOut')
      localStorage.removeItem('campID')
    },
      (error) => console.log(error)

    )
  }
}
