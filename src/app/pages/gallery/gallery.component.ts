import { Component, OnInit } from '@angular/core';
import {ContactDialogComponent} from '../contact/contact-dialog/contact-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {GalleryDialogComponent} from './gallery-dialog/gallery-dialog.component';
import {HttpClient} from '@angular/common/http';
import {Picture} from '../../models/picture.model';
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  pictures: Picture[] = [];
  constructor(public dialog: MatDialog, private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('assets/gallery.json').subscribe((data: Picture[]) => {
      this.pictures = data;
      console.log(this.pictures);
    });
  }

  openDialog(picture) {
    const dialogRef = this.dialog.open(GalleryDialogComponent, {
      data: picture,
      panelClass: 'my-panel',
      backdropClass: 'backdropBackground',
      maxHeight: '90vh'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
