import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap  } from '@angular/router';

import { switchMap } from 'rxjs/operators';

import { Item } from '../../../shared/models/item';
import { ProductsService, ProductsPromiseService } from '../../services';

@Component({
  templateUrl: './product-reviews.component.html',
  styleUrls: ['./product-reviews.component.css']
})

export class ProductReviewsComponent implements OnInit {
  public review: Item;

  constructor(
    private productsService: ProductsService,
    private productsPromiseService: ProductsPromiseService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.review = new Item( null, [], [], '', '', 0, 0, [] );

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

onGoBack(): void {
    this.router.navigate([{
      outlets: {
        review: null
      }
    }]);
  }
}
