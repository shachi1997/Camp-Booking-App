import { Component, OnInit } from '@angular/core';
import { CampService } from '../../services/camp.service';
import { Router } from '@angular/router';
import { ICamp } from '../../models/models';
import { ToastrService } from 'ngx-toastr';
import {NgbRatingConfig} from'@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-camp',
  templateUrl: './camp.component.html',
  styleUrls: ['./camp.component.css'],
  providers: [NgbRatingConfig]
})
export class CampComponent implements OnInit {

  totalRecords:string;
  page:number=1;
  pageSize:number=2;

  camp: ICamp[];
  constructor(
    private CampService: CampService,
    private router: Router,
    private toastr: ToastrService,
    config: NgbRatingConfig
  ) { config.max=5;
  config.readonly=true;}
  ngOnInit() {
    this.getAllCamps();

  }
  private getAllCamps() {
    this.CampService.getAllCamps().
      subscribe((camp: ICamp[]) => {
        this.camp = camp;
      });
  }

  navigateToUpdate(campID: string) {
    this.CampService.campByID(campID).subscribe((camps: ICamp) => {
      this.router.navigate(['camp/update'], {
        state: {
          campID: camps.CampID,
          campImage: camps.CampImage,
          campName: camps.CampName,
          description: camps.Description,
          capacity: camps.Capacity,
          weekendPrice: camps.PriceForWeekEnds,
          weekdayPrice: camps.PriceForWeekDays,
          rating:camps.Rating
        }
      })
    });
  }
  deleteCamp(campID: string) {
    if (window.confirm("Do you really want to delete this camp?")) {
      this.CampService.deleteCamp(campID).subscribe(() => {
        this.toastr.success('Camp Deleted successfully');
        this.getAllCamps();
      },
      (error)=>
      {this.toastr.error('Some error has occurred', 'ERROR!!');})
    }
  }
}



