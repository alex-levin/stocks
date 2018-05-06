import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

let stocks: Array<string> = ['AAPL', 'GOOG', 'FB', 'AMZN', 'TWTR'];
let service: string = 'https://angular2-in-action-api.herokuapp.com';
// endpoint URL: https://angular2-in-action-api.herokuapp.com/stocks/snapshot?symbols=aapl,goog,fb

export interface StockInterface {
  symbol: string;
  lastTradePriceOnly: number;
  change: number;
  changeInPercent: number;
}

@Injectable()
export class StocksService {
  constructor(private http: HttpClient) { }

  get() {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
    // Returns a copy instead of the direct value. This is done to encapsulate the stock values 
    // and prevent them from being directly modified.
    return stocks.slice();
  }
  add(stock) {
    stocks.push(stock);
    return this.get();
  }
  remove(stock) {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
    stocks.splice(stocks.indexOf(stock), 1);
    return this.get();
  }
  load(symbols) {
    if (symbols) {
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join
      // <Array<StockInterface>> is optional, but it’s very helpful to alert the compiler if you try 
      // to access properties that don’t exist
      // Returns Observable<Array<StockInterface>> which is subscribed to in AppComponent
      return this.http.get<Array<StockInterface>>(service + '/stocks/snapshot?symbols=' + symbols.join());
    }
  }
}