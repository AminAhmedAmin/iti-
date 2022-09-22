import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/Services/cart.service';
import { OrderService } from 'src/app/Services/order.service';
import { OrderdetailsService } from 'src/app/Services/orderdetails.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  carts: any;
  CartsUpdate: any[] = [];
  totalSub: number = 0;
  orderId: string = '';
  orderDetailId: string = '';
  cartid: string = '';
  constructor(private _CartService: CartService, private _OrderService: OrderService,
    private _OrderdetailsService: OrderdetailsService, private _ToastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getUserCart();
    this._CartService.removeCarts.subscribe(() =>
      this.getUserCart()
    )
  }
  getCartId(id: string) {
    this.cartid = id;
  }

  removeCart() {
    this._CartService.removeCart(this.cartid).subscribe(Response => {
      console.log(Response);
    })

  }


  getUserCart() {
    this._CartService.getCartByUser().subscribe((data) => {
      this.carts = data;
      for (let x = 0; x < this.carts.length; x++) {
        if (this.carts[x].quantity != null)
          this.carts[x].totalPrice =
            this.carts[x].product.price * this.carts[x].quantity;
      }
      this.subTotal();
    });
  }
  addOrder() {
    let order = { price: this.totalSub, userId: localStorage.getItem('id') };
    this._OrderService.addOrder(order).subscribe(response => {
      this.orderId = response.orderId;
      this.addOrderDetails();
    })

  }


  addOrderDetails() {
    let quantity: number = 0;
    for (let i = 0; i < this.carts.length; i++) {
      quantity += this.carts[i].quantity;
    }
    let orderDetails = { quantity: quantity, totalPrice: this.totalSub, orderId: this.orderId };
    this._OrderdetailsService.addOrderDetail(orderDetails).subscribe(Response => {
      this.orderDetailId = Response.orderDetailId;
      console.log(Response);
      this.updateCart();
      console.log(orderDetails);

    })
  }



  updateCart() {
    for (let i = 0; i < this.carts.length; i++) {
      let obj = { cartId: this.carts[i].cartId, totalPrice: this.carts[i].totalPrice, status: 1, quantity: this.carts[i].quantity, orderDetailsID: this.orderDetailId };
      this.CartsUpdate.push(obj);
    }
    this._CartService.updateCarts(this.CartsUpdate).subscribe(response => {
      console.log(response.message);
      if (response.message = 'success') {
        this._ToastrService.success("Your Order is Confirmed");
      }
    })

  }


  subTotal() {
    this.totalSub = 0;
    for (let i = 0; i < this.carts.length; i++) {
      if (this.carts[i].totalPrice != null)
        this.totalSub += this.carts[i].totalPrice;
    }
  }
  updateInput(value: any) {
    if (value.quantity == null) {
      value.totalPrice = value.product.price;
    } else {
      value.totalPrice = value.product.price * value.quantity;
      this.subTotal();
    }
  }


}
