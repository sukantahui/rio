import { Component, ViewChild, OnInit } from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import {Picture} from '../../../models/picture.model';
import {HttpClient} from '@angular/common/http';
import {CommonService} from "../../../services/common.service";
@Component({
  selector: 'app-picture-carousel',
  templateUrl: './picture-carousel.component.html',
  styleUrls: ['./picture-carousel.component.scss']
})
export class PictureCarouselComponent implements OnInit{

  images = [1, 2, 3, 4].map((n) => `assets/carousel/carousel_${n}.jpg`);
  pictureDetails: string[] = ['Beautiful Paro', 'I love nature', 'India is great', 'Stay at Home'];

  pictures: Picture[] = [];

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = false;
  isDeviceXs: boolean;

  @ViewChild('carousel', {static : true}) carousel: NgbCarousel;
  constructor(private http: HttpClient, public common: CommonService) { }
  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }
  ngOnInit(): void {
    this.http.get('assets/carousel.json').subscribe((data: Picture[]) => {
      this.pictures = data;
      console.log(this.pictures);
    });
    this.isDeviceXs = this.common.isDeviceXs;
  }
  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }

}
