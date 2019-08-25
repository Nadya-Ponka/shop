import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Item } from '../../../shared/models/item';
import { ProductsService } from '../../services/products-service.service';

@Component({
  templateUrl: './product-reviews.component.html',
  styleUrls: ['./product-reviews.component.css']
})

export class ProductReviewsComponent implements OnInit {
  review: Item;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.review = new Item();
    const id = this.route.snapshot.paramMap.get('productID');

    this.productsService.getProduct(id).then((data) => this.review = data );
  }

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
