import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AimsobjectivesComponent } from './aimsobjectives/aimsobjectives.component';
import { TermsandconditionsComponent } from './termsandconditions/termsandconditions.component';
import { DonationComponent } from './donation/donation.component';
import { MythsComponent } from './myths/myths.component';
import { MainpageComponent } from './mainpage/mainpage.component';



const routes: Routes = [
  {path:'', component: MainpageComponent},
  {path:'aimsandobjectives',component:AimsobjectivesComponent},
  {path:'termsandconditions',component:TermsandconditionsComponent},
  {path:'whatcanyoudonate',component:DonationComponent},
  {path:'myths',component:MythsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
