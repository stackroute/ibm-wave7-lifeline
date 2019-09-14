import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AimsobjectivesComponent } from './aimsobjectives/aimsobjectives.component';
import { TermsandconditionsComponent } from './termsandconditions/termsandconditions.component';
import { DonationComponent } from './donation/donation.component';
import { MythsComponent } from './myths/myths.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { DonorRegistrationFormComponent } from './donor-registration-form/donor-registration-form.component';
import { RecepientregistrationformcomponentComponent } from './recepientregistrationformcomponent/recepientregistrationformcomponent.component';
import { ProfileComponent } from './donordashboard/profile.component';
import { RecepientdashboardComponent } from './recepientdashboard/recepientdashboard.component';
import { LoginComponent } from './header/login/login.component';
import { EmailverificationComponent } from './emailverification/emailverification.component';
<<<<<<< HEAD
import { SearchResultsComponent } from './header/search-results/search-results.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
const routes: Routes = [
  { 
    path: '', 
    component: MainpageComponent },
  { 
    path: 'aimsandobjectives', 
    component: AimsobjectivesComponent },
  { 
    path: 'termsandconditions', 
    component: TermsandconditionsComponent },
  { 
    path: 'whatcanyoudonate', 
    component: DonationComponent },
  { 
    path: 'myths', 
    component: MythsComponent },
  { 
    path: 'donor-registration', 
    component: DonorRegistrationFormComponent },
  { 
    path: 'recepient-registration', 
    component: RecepientregistrationformcomponentComponent },
  { 
    path: 'donor', 
    component: ProfileComponent },
  { 
    path: 'recepient', 
    component: RecepientdashboardComponent },
  { 
    path: 'login', 
    component: LoginComponent },
  { 
    path: 'logout', 
    component: LoginComponent },
  { 
    path: 'id', 
    component: EmailverificationComponent },
  {
    path: 'search/:name', 
    component: SearchResultsComponent
  },
  {
    path:'forgotPassword', 
    component: ForgotpasswordComponent
  },
  {
    path:'resetPassword',
    component: ResetpasswordComponent}
=======
import { HeaderComponent } from './header/header.component';
import{ForgotpasswordComponent}from './forgotpassword/forgotpassword.component';
import{ResetpasswordComponent}from './resetpassword/resetpassword.component';
import { SearchResultsComponent } from './header/search-results/search-results.component';

const routes: Routes = [
  { path: '', component: MainpageComponent },
  { path: 'aimsandobjectives', component: AimsobjectivesComponent },
  { path: 'termsandconditions', component: TermsandconditionsComponent },
  { path: 'whatcanyoudonate', component: DonationComponent },
  { path: 'myths', component: MythsComponent },
  { path: 'donor-registration', component: DonorRegistrationFormComponent },
  { path: 'recepient-registration', component: RecepientregistrationformcomponentComponent },
  { path: 'donor', component: ProfileComponent },
  { path: 'recepient', component: RecepientdashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: MainpageComponent},
  { path: 'id', component: EmailverificationComponent },
  {path:'forgotPassword', component: ForgotpasswordComponent},
  {path:'resetPassword',component:ResetpasswordComponent},
  {
    path: 'search/:name', 
    component: SearchResultsComponent
  }
>>>>>>> 7e7014b39a5876738478d6fb2da8f10bb2a92317
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
