import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms'
import { UserService } from './services/user.service';
import { CampService } from './services/camp.service';
import { BookingService } from './services/booking.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CampComponent } from './components/camp/camp.component';
import { CreateCampComponent } from './components/create-camp/create-camp.component';
import { UpdateCampComponent } from './components/update-camp/update-camp.component';
import { BookCampComponent } from './components/book-camp/book-camp.component';
import { BookingConfirmComponent } from './components/booking-confirm/booking-confirm.component';
import { ManageBookingComponent } from './components/manage-booking/manage-booking.component';
import { UserComponent } from './components/user/user.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGaurd } from './auth-gaurd/auth.gaurd';
import { RolesGaurd } from './roles-gaurd/roles.gaurd';
import { AuthInterceptor } from './auth-gaurd/auth.interceptor';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    CampComponent,
    CreateCampComponent,
    UpdateCampComponent,
    BookCampComponent,
    BookingConfirmComponent,
    ManageBookingComponent,
    UserComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    NgbModule,
    ToastrModule.forRoot()
  ],
  providers: [UserService, CampService, BookingService, AuthGaurd, RolesGaurd, AuthInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  exports: [
    DashboardComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
