import { Component, OnInit } from '@angular/core';
import { CurrencyCode, TransactionItem, ContentsquareCDVPlugin } from '@contentsquare/cordova-plugin-types';
import { Item } from 'src/app/models/item';
import { CartService } from 'src/app/services/cart.service';

declare const ContentsquarePlugin: ContentsquareCDVPlugin;

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
})
export class TransactionsPage implements OnInit {

  cart: Item[] = [];
  total: number;
  cartLoaded = false;
  cartSubscribtion: any;

  nb_articles: number;
  public items: Item[] = [
    {
      title: 'Article1',
      price: 10,
      description: 'This is the description of art 1',
      images: []
    },
    {
      id: 'it_3534',
      title: 'Article2',
      price: 15,
      description: 'This is the description of art 2',
      images: []
    },
  ];

  constructor(public cartSvc: CartService) { }

  ngOnInit() {
  }

  sendTransaction(isTransactionIdentified: boolean) {
    const transactionItem: TransactionItem = {
      transactionValue: this.cartSvc.total,
      transactionCurrency: CurrencyCode.EUR
    };

    if (isTransactionIdentified) {
      transactionItem.transactionId = 'tr_' + new Date().getTime();
    }

    console.log('Send transaction ', transactionItem);

    ContentsquarePlugin.sendTransaction(transactionItem, (ret) => {
      console.log(ret);
      this.cartSvc.resetCard();
    }, (message) => {
      this.cartSvc.resetCard();
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
