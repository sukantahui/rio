import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { faCoffee} from '@fortawesome/free-solid-svg-icons/faCoffee';
import { faTwitter} from '@fortawesome/free-brands-svg-icons/faTwitter';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';
import { faAtom} from '@fortawesome/free-solid-svg-icons/faAtom';
import { faFlickr} from '@fortawesome/free-brands-svg-icons/faFlickr';
import { faFacebook} from '@fortawesome/free-brands-svg-icons';
import Swal from 'sweetalert2';
import {MatDialog} from '@angular/material/dialog';
import {ContactDialogComponent} from './contact-dialog/contact-dialog.component';
import {Picture} from '../../models/picture.model';
import {CommonService} from '../../services/common.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  twitter = faTwitter;
  person = faUser;
  faEnvelope = faEnvelope;
  faAtom = faAtom;
  flicker = faFlickr;
  facebook = faFacebook;
  employees: any;
  isDeviceXs: boolean;
  myVar = 'url(\'https://live.staticflickr.com/65535/50589092182_ed29f409c4_t.jpg\')';

  constructor(private http: HttpClient, public dialog: MatDialog, public common: CommonService) { }

  ngOnInit(): void {
    this.http.get('assets/contacts.json').subscribe((data: any[]) => {
      this.employees = data;
    });
    this.isDeviceXs = this.common.isDeviceXs;
  }
// https://formspree.io
  onSubmit(contactForm: NgForm) {
    if (contactForm.valid) {
      const email = contactForm.value;
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      contactForm.resetForm(); // or form.reset();
      this.http.post('https://formspree.io/f/mdopagwk',
        { name: email.name, replyto: email.email, message: email.messages },
        { headers: headers }).subscribe(
        response => {

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Mail Sent',
            showConfirmButton: false,
            timer: 3000
        }).then(r => {
        });
        }
      );
    }
  }

  goToLink(url: string) {
    window.open(url, '_blank');
  }
  openDialog(employee: any) {
    const dialogRef = this.dialog.open(ContactDialogComponent, {
      data: {
        name: employee.name,
        designation: employee.designatio,
        description: employee.description,
        twitter_id: employee.twitter_id,
        twitter: employee.twitter,
        flickr: employee.flickr,
        fb: employee.fb,
        avatar: employee.avatar,
        picture: employee.picture,
        picture_dialog: employee.picture_dialog
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
