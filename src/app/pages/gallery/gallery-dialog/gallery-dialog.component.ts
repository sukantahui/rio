import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Picture } from '../../../models/picture.model';


@Component({
  selector: 'app-gallery-dialog',
  templateUrl: './gallery-dialog.component.html',
  styleUrls: ['./gallery-dialog.component.scss']
})
export class GalleryDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Picture) { }

  ngOnInit(): void {
  }

  onNoClick() {

  }
}
