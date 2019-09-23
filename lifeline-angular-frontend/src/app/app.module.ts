import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './header/search/search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { AccountComponent } from './header/account/account.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMenuModule } from '@angular/material/menu';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { EmbedVideo } from 'ngx-embed-video';
import { VideoComponent } from './mainpage/video/video.component';
import { CarouselComponent } from './mainpage/carousel/carousel.component';
import { AimsobjectivesComponent } from './aimsobjectives/aimsobjectives.component';
import { TermsandconditionsComponent } from './termsandconditions/termsandconditions.component';
import { DonationComponent } from './donation/donation.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MythsComponent } from './myths/myths.component';
import { DonorRegistrationFormComponent } from './donor-registration-form/donor-registration-form.component';
import { MatFormFieldModule, MatInputModule, MatRadioModule, MatExpansionModule, MatSidenavModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule, MatNativeDateModule, MatCheckboxModule } from '@angular/material';
import { RecepientregistrationformcomponentComponent } from './recepientregistrationformcomponent/recepientregistrationformcomponent.component';
import { ProfileComponent } from './donordashboard/profile.component';
import { MatListModule } from '@angular/material/list';
import { RecepientdashboardComponent } from './recepientdashboard/recepientdashboard.component';
import { ReportgenerationComponent } from './reportgeneration/reportgeneration.component';
// import { DashboardreportsComponent } from './dashboardreports/dashboardreports.component';
import { LoginComponent } from './header/login/login.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { LandingpagereportsComponent } from './landingpagereports/landingpagereports.component';
import { DonordashboardreportsComponent } from './donordashboardreports/donordashboardreports.component';
import { EmailverificationComponent } from './emailverification/emailverification.component';
import { VerificationAlertComponent } from './recepientregistrationformcomponent/verification-alert/verification-alert.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { SearchResultsComponent } from './header/search-results/search-results.component';
import { SearchPipe } from './pipes/search.pipe';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReuestComponent } from './reuest/reuest.component';
import { MatTableModule } from '@angular/material';
import { RecommendationComponent } from './recepientdashboard/recommendation/recommendation.component';
import { StatusComponent } from './recepientdashboard/status/status.component';
import { OrganRequestStatusComponent } from './organ-request-status/organ-request-status.component';
import { DeletealertComponent } from './header/deletealert/deletealert.component';
import { ChatDonorBox } from './donordashboard/chat-donor-box/chat-donor-box';
import { ChatDonorButton } from './donordashboard/chat-donor-button/chat-donor-button';
import { ChatBox } from './recepientdashboard/chat-box/chat-box';
import { ChatButton } from './recepientdashboard/chat-button/chat-button';
import { StorageServiceModule } from 'angular-webstorage-service';

//  import { EmbedVideoService } from 'ngx-embed-video';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchComponent,
    AccountComponent,
    MainpageComponent,
    FooterComponent,
    SearchPipe,
    VideoComponent,
    CarouselComponent,
    AimsobjectivesComponent,
    TermsandconditionsComponent,
    DonationComponent,
    MythsComponent,
    DonorRegistrationFormComponent,
    RecepientregistrationformcomponentComponent,
    ProfileComponent,
    RecepientdashboardComponent,
    ReportgenerationComponent,
    LoginComponent,
    ResetpasswordComponent,
    ForgotpasswordComponent,
    SnackBarComponent,
    LandingpagereportsComponent,
    DonordashboardreportsComponent,
    EmailverificationComponent,
    VerificationAlertComponent,
    SearchResultsComponent,
    SearchPipe,
    ReuestComponent,
    RecommendationComponent,
    StatusComponent,
    OrganRequestStatusComponent,
    DeletealertComponent,
    ChatBox,
    ChatButton,
    ChatDonorBox,
    ChatDonorButton
  ],
  imports: [
    BrowserModule,
    EmbedVideo.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    FormsModule,
    MatCardModule,
    FlexLayoutModule,
    MatMenuModule,
    HttpClientModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatListModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    MatBottomSheetModule,
    MatToolbarModule,
    MatDialogModule,
    MatStepperModule,
    MatSelectModule,
    MatExpansionModule,
    MatSidenavModule,
    MatTableModule,
    StorageServiceModule
  ],
  entryComponents: [
    SnackBarComponent,
    VerificationAlertComponent,
    DeletealertComponent,
    ChatBox,
    ChatButton,
    ChatDonorBox,
    ChatDonorButton
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
