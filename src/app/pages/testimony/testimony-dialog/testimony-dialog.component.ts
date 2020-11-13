import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  title: string;
  message1: string;
  message2: string;
  avatar: string;
  picture: string;
}

@Component({
  selector: 'app-testimony-dialog',
  templateUrl: './testimony-dialog.component.html',
  styleUrls: ['./testimony-dialog.component.scss']
})
export class TestimonyDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

}
