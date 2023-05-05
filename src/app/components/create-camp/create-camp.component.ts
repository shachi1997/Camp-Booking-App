import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CampService } from '../../services/camp.service';
import { Router } from '@angular/router';
import { ICamp } from '../../models/models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-camp',
  templateUrl: './create-camp.component.html',
  styleUrls: ['./create-camp.component.css']
})
export class CreateCampComponent implements OnInit {
  imageUrl: string;
  previewUrl: string = "/assets/default.png";

  CreateForm: FormGroup;
  NameControl: FormControl;
  DescriptionControl: FormControl;
  ImageControl: FormControl;
  CapacityControl: FormControl;
  WeekdaysControl: FormControl;
  WeekendsControl: FormControl;
  Rating:number;

  constructor(
    private CampService: CampService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.NameControl = new FormControl('', [Validators.required]);
    this.DescriptionControl = new FormControl('', [Validators.required, Validators.maxLength(100)]);
    this.CapacityControl = new FormControl('', [Validators.required]);
    this.WeekdaysControl = new FormControl('', [Validators.required]);
    this.WeekendsControl = new FormControl('', [Validators.required]);
    this.ImageControl = new FormControl('', [Validators.required]);

    this.CreateForm = new FormGroup({
      Name: this.NameControl,
      Description: this.DescriptionControl,
      Capacity: this.CapacityControl,
      Weekdays: this.WeekdaysControl,
      Weekends: this.WeekendsControl,
      Image: this.ImageControl

    });
  }
  get validate(){
    return this.CreateForm.controls;
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
    this.previewUrl = `data:image/JPEG;base64,${this.imageUrl}`
  }
  onFormSubmit(form: FormGroup) {
    const newCamp: ICamp = {
      CampID: null,
      CampImage: this.imageUrl,
      CampName: this.CreateForm.controls.Name.value,
      Description: this.CreateForm.controls.Description.value,
      Capacity: this.CreateForm.controls.Capacity.value,
      PriceForWeekDays: this.CreateForm.controls.Weekdays.value,
      PriceForWeekEnds: this.CreateForm.controls.Weekends.value,
      Rating:null
    }
    this.CampService.createCamp(newCamp)
      .subscribe(() => {
          this.router.navigateByUrl('/camps');
          this.toastr.success('New Camp Created successfully');
        },
        error => {
          this.toastr.warning('Some error Occured');
          console.log(error)
        });

  }
}
