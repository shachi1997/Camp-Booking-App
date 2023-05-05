import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  LoginForm: FormGroup;
  EmailIDControl: FormControl;
  PasswordControl: FormControl;
  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) { }



  ngOnInit() {
    this.EmailIDControl = new FormControl('', [Validators.required, Validators.email]);
    this.PasswordControl = new FormControl('', [Validators.required, Validators.minLength(8)]);

    this.LoginForm = new FormGroup({
      EmailID: this.EmailIDControl,
      Password: this.PasswordControl
    });
   
    localStorage.setItem('token', null)
    this.userService.setIsLoggedInObserver(false);
    this.userService.setIsAdminObserver(false);
  }
  get validate(){
    return this.LoginForm.controls;
  }
  onFormSubmit() {
    this.userService.login(this.LoginForm.controls.EmailID.value, this.LoginForm.controls.Password.value)
      .subscribe(
        (data: any) => {
          localStorage.setItem('emailID', this.LoginForm.controls.EmailID.value);
          localStorage.setItem('token', data);
          this.userService.setIsLoggedInObserver(true);
          let token = localStorage.getItem('token');
          let decodedData = jwt_decode(token);
          if(decodedData.role=='True'){
            this.userService.setIsAdminObserver(true);
          }
          if(localStorage.getItem('campID')== null || localStorage.getItem('campID')==undefined){
            this.router.navigateByUrl('/dashboard')
          }
          else{
            this.router.navigateByUrl('/camp/book');
          }
          
          this.toastr.success('Logged in successfully');
        },
        error => {
          this.toastr.error('Invalid Email or Password');
          console.log(error)
        });

  }
}
