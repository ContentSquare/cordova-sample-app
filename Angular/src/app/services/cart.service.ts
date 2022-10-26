/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Item } from '../models/item';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  sum: number;
  total: number;

  public productQty = 0;
  public articlesQty = 0;

  public cart = {};

  logoutSubscribtion: any;
  private cartItems = new BehaviorSubject(0);
  private cartDetails = new BehaviorSubject({ items: [], sum: 0, total: 0, nb_articles: 0 });

  constructor() {}

  addProduct(product: Item) {
    console.log('Add item ', product);
    if (!this.cart[product.id]) {
      this.cart[product.id] = {
        amount: 1,
        ...product
      };
    } else {
      this.cart[product.id].amount += 1;
    }
    this.cartDetails.next(this.getCart());
    this.cartItems.next(this.cartItems.value + 1);
  }

  removeProduct(product: Item) {
    console.log('Remove item ', product);
    if (!this.cart[product.id]) {
      console.log('ERR');
    } else {
      if (this.cart[product.id].amount === 1) {
        delete this.cart[product.id];
      } else {
        this.cart[product.id].amount -= 1;
      }
      this.cartItems.next(this.cartItems.value - 1);
      this.cartDetails.next(this.getCart());
    }
  }

  getCartCount() {
    return this.cartItems.asObservable();
  }

  getCartDetails() {
    return this.cartDetails.asObservable();
  }

  getCart() {
    const items: Item[] = [];
    for (const [key, value] of Object.entries(this.cart)) {
      const item = value as Item;
      items.push(item);
    }
    let nb_articles = 0;
    items.forEach((item) => {
      nb_articles += item.amount;
    });
    this.sum = parseFloat(items.reduce((val, item) => (val += item.price * item.amount), 0).toFixed(2));
    if (nb_articles > 0) {
      this.total = this.sum;
    } else {
      this.total = 0;
    }
    return {
      items,
      sum: this.sum,
      total: this.total,
      nb_articles
    };
  }

  resetCard() {
    this.cart = {};
    this.cartItems.next(0);
    this.cartDetails.next({ items: [], sum: 0, total: 0, nb_articles: 0 });
  }
}
