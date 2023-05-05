import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/user/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/user/register/register.component';
import { CampComponent } from './components/camp/camp.component';
import { CreateCampComponent } from './components/create-camp/create-camp.component';
import { UpdateCampComponent } from './components/update-camp/update-camp.component';
import { BookCampComponent } from './components/book-camp/book-camp.component';
import { BookingConfirmComponent } from './components/booking-confirm/booking-confirm.component';
import { ManageBookingComponent } from './components/manage-booking/manage-booking.component';
import { AuthGaurd } from './auth-gaurd/auth.gaurd';
import { RolesGaurd } from './roles-gaurd/roles.gaurd';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'logout', component: LoginComponent },
  { path: 'camps', component: CampComponent, canActivate: [RolesGaurd] },
  { path: 'camp/create', component: CreateCampComponent, canActivate: [RolesGaurd] },
  { path: 'camp/update', component: UpdateCampComponent, canActivate: [RolesGaurd] },
  { path: 'camp/book', component: BookCampComponent, canActivate: [AuthGaurd] },
  { path: 'camp/book/confirm', component: BookingConfirmComponent, canActivate: [AuthGaurd] },
  { path: 'booking/manage', component: ManageBookingComponent, canActivate: [AuthGaurd] },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
