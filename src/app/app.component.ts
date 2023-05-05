import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  constructor(private router: Router, private userService: UserService, private toastr: ToastrService) { }

  ngOnInit() {
    this.userService.getIsLoggedInObserver().subscribe(response => {
      this.isLoggedIn = response;
    });
    this.userService.getIsAdminObserver().subscribe(response => {
      this.isAdmin = response;
    });
  }
 
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('emailID');
    localStorage.removeItem('campID');
    localStorage.removeItem('checkIn');
    localStorage.removeItem('checkOut');
    this.userService.setIsLoggedInObserver(false);
    this.userService.setIsAdminObserver(false);
    this.router.navigateByUrl('/dashboard');
    this.toastr.success('Successfully Logout!');
  }
}

