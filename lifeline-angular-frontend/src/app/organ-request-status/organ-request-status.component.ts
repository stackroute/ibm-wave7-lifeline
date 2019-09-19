import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-organ-request-status',
  templateUrl: './organ-request-status.component.html',
  styleUrls: ['./organ-request-status.component.css']
})
export class OrganRequestStatusComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<OrganRequestStatusComponent>) { }

  ngOnInit() {
  }

  onClose(): void {
    this.dialogRef.close();
  }
}




