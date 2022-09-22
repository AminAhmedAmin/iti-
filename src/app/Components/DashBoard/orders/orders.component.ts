import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/Services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  allOrders: any[] = []
  orderId:any;
  constructor(private _orderService:OrderService) { }

  ngOnInit(): void {
    this.getAllOrders()
  }

  getAllOrders(){
    this._orderService.getOrder().subscribe(
      data=>{
        this.allOrders=data
        console.log(data)
      }
    )
  }
  getOrderId(id: string) {
    this.orderId = id;
  }
  deleteOrder(){
    this._orderService.deleteOrder(this.orderId).subscribe(
      data=>{
        console.log(data)
      }
    )
  }
}
