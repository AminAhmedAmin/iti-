import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/Services/category.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/Services/cart.service';
@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.css']
})
export class MobileComponent implements OnInit {
  products: any;
  searchValue: string = '';

  constructor(private _CategoryService: CategoryService, private router: Router, private _ToastrService: ToastrService, private _CartService: CartService) { }

  ngOnInit(): void {
    this.getMobiles();
  }
  getMobiles() {
    this._CategoryService.getMobile().subscribe(data => {
      console.log(data.products);
      this.products = data.products;
    })
  }
  goToProductDetails(productDetails: any) {
    let productId = productDetails.productID
    this.router.navigate(['Home', productId])
  }
  addCart(id: string) {
    let cart: {} = { ProductId: id, UserId: localStorage.getItem('id') };
    this._CartService.addCart(cart).subscribe(respons => {
      if (respons.message == 'success')
        // alert('Your Product is Add to Cart')
        this._ToastrService.success('Product added to cart successfully');
      // console.log(respons);
    });
  }
}
