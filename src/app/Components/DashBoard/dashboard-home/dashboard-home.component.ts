import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/Services/order.service';
import { ProductService } from 'src/app/Services/product.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit {

  constructor(private userService: UserService,
    private productService: ProductService,
    private orderService: OrderService) { }

  users: any;
  product: any;
  orders: any;
  productNumber: any
  usersNumber: any
  ordersNumber: any
  filterMetaData = { count: 0 }
  loading = false
  ngOnInit(): void {
    this.getAllProducts()
    this.getUsers()
    this.getOrders()
  }
  getUsers() {
    this.loading = true
    this.userService.getAllUser().subscribe(data => {
      this.users = data
      this.usersNumber = this.users.length
      this.loading = false
    })
  }

  getAllProducts() {
    this.loading = true
    this.productService.getProducts().subscribe(data => {
      this.product = data;
      this.productNumber = this.product.length
      this.loading = false
      console.log(this.product)
    }, error => {
      console.log(error)
    })
  }
  getOrders() {
    this.orderService.getOrder().subscribe(data => {
      this.orders = data;
      this.ordersNumber = this.orders.length
    })
  }
}
