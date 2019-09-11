import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-donorside-verificationalert',
  templateUrl: './donorside-verificationalert.component.html',
  styleUrls: ['./donorside-verificationalert.component.css']
})
export class DonorsideVerificationalertComponent implements OnInit {

  constructor(  public dialogRef: MatDialogRef<DonorsideVerificationalertComponent>) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
