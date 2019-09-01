import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap  } from '@angular/router';

import { Subscription } from 'rxjs';
import { map, catchError, take } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';

import { Item } from '../../../shared/models/item';
import { ProductsService, ProductsPromiseService } from '../../services';

@Component({
  templateUrl: './product-reviews.component.html',
  styleUrls: ['./product-reviews.component.css']
})

export class ProductReviewsComponent implements OnInit {
  review: Promise < Item > ;

  constructor(
    private productsService: ProductsService,
    private productsPromiseService: ProductsPromiseService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.review = new Item({});

    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          return params.get('productID') ?
            this.productsPromiseService.getProduct(+params.get('productID'))
            // when Promise.resolve(null) => task = null => {...null} => {}
            :
            Promise.resolve(null);
        }))
      .subscribe(
        product => this.review = {
          ...product
        },
        err => console.log(err)
      );
  }

/*   onSaveTask() {
    const review = {
      ...this.review
    };

    if (review.id) {
      this.productsService.createProduct(review);
    } else {
      this.productsService.updateProduct(review);
    }
  }
 */
  onGoBack(): void {
    this.router.navigate([{
      outlets: {
        review: null
      }
    }]);
  }
}
