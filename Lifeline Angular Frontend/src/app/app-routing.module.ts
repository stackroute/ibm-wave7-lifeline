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



const routes: Routes = [
  { path: '', component: MainpageComponent },
  { path: 'aimsandobjectives', component: AimsobjectivesComponent },
  { path: 'termsandconditions', component: TermsandconditionsComponent },
  { path: 'whatcanyoudonate', component: DonationComponent },
  { path: 'myths', component: MythsComponent },
  { path: 'donor-registration', component: DonorRegistrationFormComponent },
  { path:'recepient-registration',component:RecepientregistrationformcomponentComponent},
  { path:'donor-dashboard',component:ProfileComponent},
  { path:'recepient-dashboard',component:RecepientdashboardComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
