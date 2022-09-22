import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { ProductService } from 'src/app/Services/product.service';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private _ProductService: ProductService, private _AuthService: AuthService, private _CartService: CartService) { }
  userName: string = `${localStorage.getItem('name')}`;
  hasLoggedin = false;
  hasAdmin = false;
  CartsNumber: any;
  ngOnInit(): void {
    // this.userName = `${localStorage.getItem('name')}`;
    if (localStorage.getItem('token') != null) {
      this.hasLoggedin = true;
    }
    if (this._AuthService.userRole.getValue() == 'admin') {
      this.hasAdmin = true;
    }
    this._CartService.cartStats.subscribe(() =>
      this.getUserCart()
    )
  }


  signOut() {
    this._AuthService.signOut();
  }
  getUserCart() {
    this._CartService.getCartByUser().subscribe((data) => {
      this.CartsNumber = data.length;
    });

  }



  faUser = faUser;
  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faInstagram = faInstagram;
  faLinkedinIn = faLinkedinIn;

}
