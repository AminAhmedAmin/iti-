import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/Services/product.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  users: any
  loading = false
  products: any
  constructor(private userService: UserService, private productService: ProductService,
    private _ToastrService: ToastrService) { }

  ngOnInit(): void {
    this.getUsers()
    this.getUsers()
  }
  getUsers() {
    this.loading = true
    this.userService.getUsers().subscribe(data => {
      this.users = data
      console.log(this.users)
    })
  }
  getProducts() {
    this.productService.getProducts().subscribe(data => {
      this.products = data
      console.log(this.products)
    })
  }

  // Delete Product
  deleteUser(user: string) {
    this.userService.deleteUser(user).subscribe(data => {
      this._ToastrService
        .success("Product Deleted Successfully");
    })
  }
}
