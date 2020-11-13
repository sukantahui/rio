import { Component, OnInit } from '@angular/core';
import {Picture} from '../../models/picture.model';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {TestimonyDialogComponent} from './testimony-dialog/testimony-dialog.component';
import {CommonService} from '../../services/common.service';

@Component({
  selector: 'app-testimony',
  templateUrl: './testimony.component.html',
  styleUrls: ['./testimony.component.scss']
})
export class TestimonyComponent implements OnInit {
  comments: any ;
  sukantahui: any;
  isDeviceXs: boolean;
  constructor(private http: HttpClient, public dialog: MatDialog, public common: CommonService) { }

  ngOnInit(): void {
    this.http.get('assets/comments.json').subscribe((data: any[]) => {
      this.comments = data;
      console.log(this.comments);
    });
    this.isDeviceXs = this.common.isDeviceXs;
    this.http.get('assets/sukantahui.json').subscribe((data: any) => {
      this.sukantahui = data;
    });
  }
  openDialog(sukanta: any) {
    const dialogRef = this.dialog.open(TestimonyDialogComponent, {
      data: {
        title: sukanta.title,
        message1: sukanta.message1,
        message2: sukanta.message2,
        avatar: sukanta.avatar,
        picture: sukanta.picture
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
