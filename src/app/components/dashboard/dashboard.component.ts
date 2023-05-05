import { Component, OnInit } from '@angular/core';
import { ICamp } from '../../models/models';
import { Router } from '@angular/router';
import { CampService } from '../../services/camp.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { NgbRatingConfig } from'@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';


//for setting default dates
interface DefaultDates {
  checkInDate: Date;
  checkOutDate: Date;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [NgbRatingConfig]
})
export class DashboardComponent implements OnInit {
  // Array<string>
  capacityArray = ['Any', '1', '2', '4', '8']
  defaultCapacity: any;
  defaultDates: DefaultDates = {
    checkInDate: new Date(Date.now()),
    checkOutDate: new Date(Date.now())

  }
  SearchForm: FormGroup;
  CheckInControl: FormControl;
  CheckOutControl: FormControl;
  CapacityControl: FormControl;
  camps: ICamp[];
  constructor(
    private CampService: CampService,
    private router: Router,
    private toastr:ToastrService,
    config: NgbRatingConfig ) {
    config.max=5;
    config.readonly=true; 
  }

  //for pagination
  totalRecords: string;
  page: number = 1;
  pageSize: number = 2;

  ngOnInit() {
    this.defaultDates.checkOutDate.setDate(this.defaultDates.checkInDate.getDate() + 1)
    this.CheckInControl = new FormControl(formatDate(this.defaultDates.checkInDate, 'yyyy-MM-dd', 'en'), [Validators.required]);
    this.CheckOutControl = new FormControl(formatDate(this.defaultDates.checkOutDate, 'yyyy-MM-dd', 'en'), [Validators.required]);
    this.CapacityControl = new FormControl('', Validators.required)

    this.SearchForm = new FormGroup({
      CheckIn: this.CheckInControl,
      CheckOut: this.CheckOutControl,
      Capacity: this.CapacityControl
    });
    
  }
  
  searchCamps() {
    this.defaultCapacity = this.SearchForm.controls.Capacity.value
    if (this.SearchForm.controls.Capacity.value == 'Any' || this.SearchForm.controls.Capacity.value == '') {
      this.defaultCapacity = ''
    }
    else {
      this.defaultCapacity = this.SearchForm.controls.Capacity.value
    }
    this.CampService.searchCamp(this.SearchForm.controls.CheckIn.value, this.SearchForm.controls.CheckOut.value, this.defaultCapacity)
      .subscribe((campList: ICamp[]) => {
        this.camps = campList;
        localStorage.setItem('checkIn', this.SearchForm.controls.CheckIn.value);
        localStorage.setItem('checkOut', this.SearchForm.controls.CheckOut.value);
      },(error)=>{
        this.toastr.info('No camps available for this date or capacity, Check out for other dates')
      }
      );
  }
  navigateToBook(campID: string) {
   if(localStorage.getItem('token')==null || localStorage.getItem('token')==undefined){
    this.router.navigateByUrl('/login')
   }
   else{
     this.router.navigateByUrl('/camp/book')
   }
    
    localStorage.setItem('campID', campID)
  }
}
