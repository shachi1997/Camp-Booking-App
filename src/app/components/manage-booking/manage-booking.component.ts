import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { CampService } from '../../services/camp.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IBooking } from '../../models/models';
import { ToastrService } from 'ngx-toastr';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrls: ['./manage-booking.component.css'],
  providers: [NgbRatingConfig]


})
export class ManageBookingComponent implements OnInit {

  billingAddress: string;
  state: string;
  country: string;
  zipCode: string;
  phone: string;
  price: string;
  checkIn: string;
  checkOut: string;
  public detailsCard: boolean = false;
  public rateCard: boolean = false;

  currentRate: number;
  FetchForm: FormGroup
  BookingRefNoControl: FormControl
  constructor(
    private BookingService: BookingService,
    private route: Router,
    private toastr: ToastrService,
    private CampService: CampService,
    config: NgbRatingConfig
  ) { config.max = 5 }

  ngOnInit(): void {
    this.BookingRefNoControl = new FormControl('', [Validators.required]);

    this.FetchForm = new FormGroup({
      BookingRefNo: this.BookingRefNoControl,
    });
    this.currentRate = 3
  }
  fetchBooking() {
    this.BookingService.confirmBooking(this.FetchForm.controls.BookingRefNo.value)
      .subscribe((booking: IBooking) => {
        this.billingAddress = booking.BillingAddress,
          this.state = booking.State,
          this.country = booking.Country,
          this.zipCode = booking.ZipCode,
          this.phone = booking.CellPhone,
          this.price = booking.TotalAmount,
          this.checkIn = booking.CheckIn,
          this.checkOut = booking.CheckOut

        this.detailsCard = !this.detailsCard;
      }, (error) => console.log(error)
      )
  }
  rating(currentRate) {
    this.CampService.postRating(this.FetchForm.controls.BookingRefNo.value, currentRate).subscribe(
      () => {
        this.toastr.success('Thank you for your valuable feedback!')
        this.route.navigateByUrl('/dashboard');
      },
      (error) => { console.log(error) }
    )
  }

  deleteBooking() {
    if (window.confirm("Are you sure? Do you really want to delete your booking?")) {
      this.BookingService.deleteBooking(this.FetchForm.controls.BookingRefNo.value)
        .subscribe(() => {
          this.toastr.success('Booking Deleted successfully');
        },

          (error) => {
          this.rateCard = !this.rateCard
            this.toastr.info("You Can't Delete this booking, because it's" +
              " a past booking, But you can rate your experience with us. It would be appreciated!");
          }
        )
    }
  }
}
