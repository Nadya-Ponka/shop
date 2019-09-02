import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { Item } from '../../../shared/models/item';
import { ProductsService } from '../../services/products-service.service';

@Component({
  templateUrl: './product-reviews.component.html',
  styleUrls: ['./product-reviews.component.css']
})

export class ProductReviewsComponent implements OnInit {
  review: Item;
  private sub: Subscription;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('productID');

    this.sub = this.productsService.getProduct(id)
      .subscribe(
        product => {
          this.review = {...product};
        },
        err => console.log(err)
      );
  }

  // по моему нигде не используется
  onSaveTask() {
    const review = { ...this.review };

    if (review.id) {
      this.productsService.createProduct(review);
    } else {
      this.productsService.updateProduct(review);
    }
  }

  onGoBack(): void {
    this.router.navigate([{ outlets: { review: null }
    }]);
  }
}
