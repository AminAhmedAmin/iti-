import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-main-dash-board',
  templateUrl: './main-dash-board.component.html',
  styleUrls: ['./main-dash-board.component.css']
})
export class MainDashBoardComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }
  goToCustomers() {
    this.router.navigate(['customers'], { relativeTo: this.activatedRoute })
  }
  goToOrders() {
    this.router.navigate(['orders'], { relativeTo: this.activatedRoute })
  }
  goToProducts() {
    this.router.navigate(['products'], { relativeTo: this.activatedRoute })
  }
  goToMainDashBoard() {
    this.router.navigate(['dashboard'], { relativeTo: this.activatedRoute })
  }
}
