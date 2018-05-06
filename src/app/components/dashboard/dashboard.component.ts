import { Component, OnInit } from '@angular/core';
import { StocksService, StockInterface } from '../../services/stocks.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stocks: Array<StockInterface>;
  symbols: Array<string>;
  constructor(private service: StocksService) {
    // This works because this is a synchronous action that loads a value directly from memory.
    this.symbols = service.get();
  }
  ngOnInit() {
    this.service.load(this.symbols)
      .subscribe(stocks => this.stocks = stocks);
  }
}