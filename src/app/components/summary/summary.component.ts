import { Component, Input } from '@angular/core';
import { StockInterface } from '../../services/stocks.service';

@Component({
  selector: 'summary',
  styleUrls: ['./summary.component.css'],
  templateUrl: './summary.component.html'
})
export class SummaryComponent {

  // Input indicates that this property is to be provided to the component by a parent 
  // component passing it to the summary. Properties are bound to an element using an attribute.
  // app.component.html: <summary [stock]="stocks[0]"></summary>
  // Input is passed through a binding attribute: [stock]="stocks[0]".
  // @Input() stock: any;
  // I replaced any with StockInterface:
  @Input() stock: StockInterface;

  isNegative() {
    return (this.stock && this.stock.change < 0);
  }

  isPositive() {
    return (this.stock && this.stock.change > 0);
  }

}