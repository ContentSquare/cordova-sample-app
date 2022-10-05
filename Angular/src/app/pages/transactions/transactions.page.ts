import { Component, NgZone, OnInit } from '@angular/core';
import { CurrencyCode, TransactionItem, ContentsquareCDVPlugin } from '@contentsquare/cordova-plugin-types';
import { Item } from 'src/app/models/item';
import { CartService } from 'src/app/services/cart.service';

declare const ContentsquarePlugin: ContentsquareCDVPlugin;

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
})

// This class showcases how to track purchases made by an user with CustomerTransactions
// Add some items to the cart, then validate it to send the transaction
export class TransactionsPage implements OnInit {

  cart: Item[] = [];
  total: number;
  cartLoaded = false;
  cartSubscribtion: any;

  nb_articles: number;
  public items: Item[] = [
    {
      title: 'Item1',
      price: 10,
      description: 'This is the description of art 1',
      images: []
    },
    {
      id: 'it_3534',
      title: 'Item2',
      price: 15,
      description: 'This is the description of art 2',
      images: []
    },
  ];

  constructor(public cartSvc: CartService, private ngZone: NgZone) { }

  ngOnInit() {
  }

  // As a transaction represents a purchase made by a customer, you don't send the transaction as soon as the user adds an item to the cart
  // Wait for the user to validate the purchase
  sendTransaction(isTransactionIdentified: boolean) {
    const transactionItem: TransactionItem = {
      transactionValue: this.cartSvc.total,
      transactionCurrency: CurrencyCode.EUR
    };

    if (isTransactionIdentified) {
      transactionItem.transactionId = 'tr_' + new Date().getTime();
    }

    console.log('Send transaction ', transactionItem);

    // Use Angular's ngZone in the callbacks methods so that Angular autodetects changes and update UI
    ContentsquarePlugin.sendTransaction(transactionItem, (ret) => {
      console.log(ret);
      this.ngZone.run(() => {
        this.cartSvc.resetCard();
      });
    }, (message) => {
      this.ngZone.run(() => {
        this.cartSvc.resetCard();
      });
      console.log(message);
    });
  }

  ionViewWillEnter() {
    this.cartLoaded = false;
    if (this.cartSubscribtion) {
      this.cartSubscribtion.unsubscribe();
    }
    this.cartSubscribtion = this.cartSvc.getCartDetails().subscribe((data) => {
      this.cart = data.items;
      this.total = data.total;
      this.nb_articles = data.nb_articles;
      this.cartLoaded = true;
    });

  }

  ionViewWillLeave() {
    this.cartSubscribtion.unsubscribe();
  }

  addToCart(product: Item) {
    this.cartSvc.addProduct(product);
  }

  updateCart(product: Item, action) {
    if (action === 'add') {
      this.cartSvc.addProduct(product);
    }
    if (action === 'remove') {
      this.cartSvc.removeProduct(product);
    }
  }


}
