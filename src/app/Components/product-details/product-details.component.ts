import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/Services/product.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productId: any;
  products: any
  productDetail: any;
  quantity: number = 1;
  constructor(private _activetedRouter: ActivatedRoute, private _productService: ProductService,
    private _CartService: CartService, private _ToastrService: ToastrService,
    private _ActivatedRoute: ActivatedRoute, private router: Router
  ) { }

  //   routerLink="/Home/{{p.productID}}" (click)="loadProducts()"

  ngOnInit(): void {
    this.loadProducts()
    this.getProducts()
    this.productId = this._activetedRouter.snapshot.paramMap.get('id')
  }


  loadProducts() {
    this._productService.getProductDetail(this._activetedRouter.snapshot.paramMap.get('id'))
      .subscribe(data => {
        this.productDetail = data
        console.log(this.productDetail)
      }, error => {
        console.log(error)
      })
  }
  getProducts() {
    this._productService.getProducts().subscribe(data => {
      this.products = data
    }, error => {
      console.log(error)
    })
  }

  addCart() {
    let id = this._ActivatedRoute.snapshot.params['id'];
    let cart: {} = { ProductId: id, UserId: localStorage.getItem('id'), quantity: this.quantity };
    this._CartService.addCart(cart).subscribe(respons => {
      if (respons.message == 'success')
        // alert('Your Product is Add to Cart')
        this._ToastrService.success('Product added to cart successfully');
      console.log(this.quantity);
      // console.log(respons);
    });
  }

  AddCart(id: string) {
    let cart: {} = { ProductId: id, UserId: localStorage.getItem('id') };
    this._CartService.addCart(cart).subscribe(respons => {
      if (respons.message == 'success')
        // alert('Your Product is Add to Cart')
        this._ToastrService.success('Product added to cart successfully');
      // console.log(respons);
    });
  }
}
