import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/Services/cart.service';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  products: any;
  searchValue: string = '';
  subCategory: any;
  loading = false
  constructor(private _productService: ProductService, private _CartService: CartService, private router: Router, private _ToastrService: ToastrService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getSubCategory();
  }
  getProducts() {
    this.loading = true
    this._productService.getProducts().subscribe(data => {
      // this.products = data
      this.loading = false;
      this.products = data;
    }, error => {
      console.log(error)
    })
  }
  getSubCategory() {
    this.loading = true
    this._productService.getSubCategoty().subscribe(response => {
      this.subCategory = response;
      this.loading = false
    }, error => {
      console.log(error)
    })
  }
  goToProductDetails(productDetails: any) {
    let productId = productDetails.productID
    this.router.navigate(['Home', productId])
  }

  addCart(id: string) {
    if (localStorage.getItem('token') != null) {
      let cart: {} = { ProductId: id, UserId: localStorage.getItem('id') };
      this._CartService.addCart(cart).subscribe(respons => {
        if (respons.message == 'success')
          // alert('Your Product is Add to Cart')
          this._CartService.CartNumbers = respons.length;
        this._ToastrService.success('Product added to cart successfully');
        // console.log(respons);
      });
    }
    else {
      this.router.navigateByUrl('/signin');

    }

  }
}
