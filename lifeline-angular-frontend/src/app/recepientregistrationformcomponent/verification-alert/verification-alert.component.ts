import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-verification-alert',
  templateUrl: './verification-alert.component.html',
  styleUrls: ['./verification-alert.component.css']
})
export class VerificationAlertComponent implements OnInit {

  constructor(  public dialogRef: MatDialogRef<VerificationAlertComponent>) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
