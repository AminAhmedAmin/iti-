import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private route: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }
  goToCustomers() {
    this.route.navigate(['customers'], { relativeTo: this.activatedRoute })
  }
  goToOrders() {
    this.route.navigate(['orders'], { relativeTo: this.activatedRoute })
  }
  goToProducts() {
    this.route.navigate(['products'], { relativeTo: this.activatedRoute })
  }
  goToMainDashBoard() {
    this.route.navigate(['dashboard'], { relativeTo: this.activatedRoute })
  }
  goToAdmins(){
    this.route.navigate(['admins'],{relativeTo:this.activatedRoute})
  }
  goToUsers(){
    this.route.navigate(['users'],{relativeTo:this.activatedRoute})
  }
}
