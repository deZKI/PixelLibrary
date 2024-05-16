import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {NgClass, NgFor} from "@angular/common";

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
  imports: [
    MatIcon,
    NgClass,
    NgFor
  ],
  standalone: true
})
export class StarRatingComponent implements OnInit {
  @Input() rating: number = 0;
  @Output() ratingChange = new EventEmitter<number>();

  stars: boolean[] = Array(5).fill(false);

  ngOnInit() {
    this.updateStars(this.rating);
  }

  updateStars(rating: number): void {
    this.stars = this.stars.map((_, index) => index < rating);
  }

  onRate(rating: number): void {
    this.rating = rating;
    this.updateStars(rating);
    this.ratingChange.emit(this.rating);
  }
}
