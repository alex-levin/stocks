import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

let stocks: Array<string> = ['AAPL', 'GOOG', 'FB', 'AMZN', 'TWTR'];

// endpoint URL: https://angular2-in-action-api.herokuapp.com/stocks/snapshot?symbols=aapl,goog,fb
/*
[{"symbol":"AAPL","lastTradePriceOnly":217.58,"change":4.2599945,"changeInPercent":0.019969972},
{"symbol":"GOOG","lastTradePriceOnly":1200.96,"change":-5.5300293,"changeInPercent":-0.0045835683},
{"symbol":"FB","lastTradePriceOnly":173.8,"change":-0.8999939,"changeInPercent":-0.0051516537}]
 */
// endpoint URL: https://angular2-in-action-api.herokuapp.com/stocks/historical/GOOG
/*
[{"date":"2018-08-17T04:00:00.000Z","open":1202.030029,"high":1209.02002,"low":1188.23999,"close":1200.959961,"adjClose":1200.959961,"volume":1381900,"symbol":"GOOG"},
{"date":"2018-08-16T04:00:00.000Z","open":1224.72998,"high":1226,"low":1202.550049,"close":1206.48999,"adjClose":1206.48999,"volume":1343200,"symbol":"GOOG"},
{"date":"2018-08-15T04:00:00.000Z","open":1229.26001,"high":1235.23999,"low":1209.51001,"close":1214.380005,"adjClose":1214.380005,"volume":1828800,"symbol":"GOOG"},
...
 */
let service: string = 'https://angular2-in-action-api.herokuapp.com';

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