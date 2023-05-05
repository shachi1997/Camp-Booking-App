import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CampService } from '../../services/camp.service';
import { ICamp } from '../../models/models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-camp',
  templateUrl: './update-camp.component.html',
  styleUrls: ['./update-camp.component.css']
})
export class UpdateCampComponent implements OnInit {
  imageUrl: string;
  campObj: ICamp
  CampID: string;
  CampName: string;
  CampImage: string;
  Description: string;
  Capacity: string;
  WeekDays: string;
  WeekEnds: string;
  previewUrl:string;
  Rating:number;

  UpdateForm: FormGroup;
  NameControl: FormControl;
  DescriptionControl: FormControl;
  CapacityControl: FormControl;
  WeekDaysControl: FormControl;
  WeekEndsControl: FormControl;

  constructor(
    private CampService: CampService,
    private router: Router,
    private toastr: ToastrService
  ) { }
  ngOnInit() {
    this.NameControl = new FormControl('', [Validators.required]);
    this.DescriptionControl = new FormControl('', [Validators.required, Validators.maxLength(100)]);
    this.CapacityControl = new FormControl('', [Validators.required]);
    this.WeekDaysControl = new FormControl('', [Validators.required]);
    this.WeekEndsControl = new FormControl('', [Validators.required]);

    this.UpdateForm = new FormGroup({
      CampName: this.NameControl,
      Description: this.DescriptionControl,
      Capacity: this.CapacityControl,
      WeekDays: this.WeekDaysControl,
      WeekEnds: this.WeekEndsControl
    });

      this.CampName = window.history.state.campName,
      this.CampImage = window.history.state.campImage,
      this.CampID = window.history.state.campID,
      this.Capacity = window.history.state.capacity,
      this.Description = window.history.state.description,
      this.WeekDays = window.history.state.weekdayPrice,
      this.WeekEnds = window.history.state.weekendPrice,
      this.Rating= window.history.state.rating,
      this.imageUrl = this.CampImage

      this.previewUrl= `data:image/JPEG;base64,${this.CampImage}`
  }
  get validate(){
    return this.UpdateForm.controls;
  }
  
  handleFileInput(event) {
    const file = event.target.files;
    if (file && file.length > 0) {
      const f = file[0];
      const reader = new FileReader();
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(f);
    }

  }
  handleReaderLoaded(evt) {
    const binaryStr = evt.target.result;
    this.imageUrl = btoa(binaryStr);
    this.previewUrl =`data:image/JPEG;base64,${this.imageUrl}`;
  }
  onFormUpdate(campID: string) {
    console.log(window.history.state.campImage)
    this.campObj = {
      CampID: campID,
      CampName: this.CampName,
      Capacity: this.Capacity,
      CampImage: this.imageUrl,
      Description: this.Description,
      PriceForWeekDays: this.WeekDays,
      PriceForWeekEnds: this.WeekEnds,
      Rating:this.Rating
    }

    this.CampService.updateCamp(this.campObj)
      .subscribe(() => {
        this.router.navigateByUrl('/camps');
        this.toastr.success('Camp Updated successfully');

      }, (error) => {
        this.toastr.error('Something wrong happened here, Try Again.');
        console.log(error)
      });
  }
}
