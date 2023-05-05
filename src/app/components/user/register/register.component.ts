import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  RegisterForm: FormGroup;
  EmailIDControl: FormControl;
  PasswordControl: FormControl;

  constructor
  (
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.EmailIDControl = new FormControl('', [Validators.required, Validators.email]);
    this.PasswordControl = new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&]).{8,}")]);

    this.RegisterForm = new FormGroup({
      EmailID: this.EmailIDControl,
      Password: this.PasswordControl
    });
  }
  get validate() {
    return this.RegisterForm.controls;
  }
  onFormSubmit() {
    this.userService.register(this.RegisterForm.controls.EmailID.value, this.RegisterForm.controls.Password.value)
      .subscribe(
        (data: any) => {
          localStorage.setItem('emailID', this.RegisterForm.controls.EmailID.value);
          localStorage.setItem('token', data);
          this.userService.setIsLoggedInObserver(true);
          if (localStorage.getItem('campID') == null || localStorage.getItem('campID') == undefined) {
            this.router.navigateByUrl('/dashboard')
          }
          else {
            this.router.navigateByUrl('/camp/book');
          }
          this.toastr.success('Successfully Registered');
        },
        error => {
          this.toastr.warning('This Email-ID is Already Exists!');
          console.log(error)
        });

  }
}
