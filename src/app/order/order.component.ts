import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, FormControl, FormArray, Validators, AbstractControl } from '@angular/forms';
import { UserModel } from './models/order.model';
import { CustomValidators } from './validators';

// rxjs
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { CartService } from './../cart/cart.service';
import { Item } from '../shared/models/item';
import { OrderService } from './../order/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})

export class OrderComponent implements OnInit {
  countries: Array < string > = ['Ukraine', 'Armenia', 'Belarus', 'Hungary', 'Kazakhstan', 'Poland', 'Russia'];
  placeholder = {
    email: 'Email (required)',
    phone: 'Phone',
    confirmEmail: 'Confirm Email (required)'
  };

  // data model
  user: UserModel = new UserModel('Nadzeya',
    'Ponkratova',
    'nadzeya_ponkratova@epam.com',
    false
  );

  // form model
  userForm: FormGroup;
  validationMessage: string;

  private validationMessagesMap = {
    email: {
      required: 'Please enter your email address.',
      pattern: 'Please enter a valid email address.',
      email: 'Please enter a valid email address.',
      asyncEmailInvalid: 'This email already exists. Please enter other email address.'
    }
 };
  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  arrayItems$: Observable < Array < {
    elem: Item,
    count: number
  } >> ;

  public items: {
    elem: Item,
    count: number
  } [];
  public showThanks = false;
  public totalCount: number;
  public totalPrice: number;

  private setValidationMessage(c: AbstractControl, controlName: string) {
    this.validationMessage = '';

    if ((c.touched || c.dirty) && c.errors) {
      this.validationMessage = Object.keys(c.errors)
        .map(key => this.validationMessagesMap[controlName][key])
        .join(' ');
    }
  }

  private buildForm() {
    this.userForm = this.fb.group({
      // firstName: ['', [Validators.required, Validators.minLength(3)]],
      // It works!
      // firstName: new FormControl('', {validators: [Validators.required, Validators.minLength(3)], updateOn: 'blur'}),
      // It works since v7
      firstName: this.fb.control('', {
        validators: [Validators.required, Validators.minLength(3)],
        updateOn: 'blur'
      }),
      lastName: this.fb.control(''),
      emailGroup: this.fb.group({
        email: ['',
          [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+'), Validators.email],
          // [CustomValidators.asyncEmailPromiseValidator]
        ],
        confirmEmail: ['', Validators.required] }, { validator: CustomValidators.emailMatcher }),
      phones: this.fb.array([this.buildPhones()]),
      sendProducts: true,
      addresses: this.fb.array([this.buildAddress()])
    });
  }
  get addresses(): FormArray {
    return this.userForm.get('addresses') as FormArray;
  }
  get phones(): FormArray {
    return this.userForm.get('phones') as FormArray;
  }

  ngOnInit() {
    this.arrayItems$ = this.cartService.getUnits();
    this.arrayItems$.pipe(take(1)).subscribe(value => this.items = value);
    this.totalPrice = this.cartService.getTotalPrice();
    this.totalCount = this.cartService.getTotalCount();
    this.buildForm();
  }

  onGoCart() {
    this.showThanks = false;
    const link = ['/cart'];
    this.router.navigate(link);
  }

  onGoBack() {
    this.showThanks = false;
    const link = ['/home'];
    this.router.navigate(link);
  }

  onBlur() {
    const emailControl = this.userForm.get('emailGroup.email');
    this.setValidationMessage(emailControl, 'email');
  }

  onAddAddress(): void {
    this.addresses.push(this.buildAddress());
  }

  onAddPhones(): void {
    this.phones.push(this.buildPhones());
  }

  onDeletePhones(index): void {
    this.phones.removeAt(index);
  }

  onSave() {
    // Form model
    console.log(this.userForm);
    // Form value w/o disabled controls
    console.log(`Saved: ${JSON.stringify(this.userForm.value)}`);
    // Form value w/ disabled controls
    console.log(`Saved: ${JSON.stringify(this.userForm.getRawValue())}`);
    this.showThanks = true;

    const order = {
      user: this.user,
      order: this.items
    };
    this.orderService.saveOrder(order);

  }

  private buildAddress(): FormGroup {
    return this.fb.group({
      addressType: 'home',
      country: '',
      city: '',
      zip: '',
      street1: '',
      street2: ''
    });
  }

  private buildPhones(): FormGroup {
    return this.fb.group({
      phone: '',
    });
  }
}
