import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  ParamMap,
  Router
} from '@angular/router';

import {
  switchMap
} from 'rxjs/operators';

import {
  Item
} from '../../../shared/models/item';
import {
  ProductsService
} from '../../services/products-service.service';

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
    console.log('ID: ', id);
    this.productsService.getProduct(id).then((data) => {
      this.review = data;
      console.log('review: ', this.review);
    });

    /* this.route.paramMap
          .pipe(
            switchMap((params: ParamMap) => this.productsService.getProduct(+params.get('productID'))))
          .subscribe(
            review => this.review = {...review},
            err => console.log(err)
        ); */
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
