import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './Components/account/account.component';
import { SignInComponent } from './Components/Auth/sign-in/sign-in.component';
import { SignUpComponent } from './Components/Auth/sign-up/sign-up.component';
import { CartComponent } from './Components/cart/cart.component';
import { CategoryComponent } from './Components/category/category/category.component';
import { LabtopComponent } from './Components/category/labtop/labtop.component';
import { MobileComponent } from './Components/category/mobile/mobile.component';
import { TelevisionComponent } from './Components/category/television/television.component';
import { AdminsComponent } from './Components/DashBoard/admins/admins.component';
import { CustomersComponent } from './Components/DashBoard/customers/customers.component';
import { DashboardHomeComponent } from './Components/DashBoard/dashboard-home/dashboard-home.component';
import { MainDashBoardComponent } from './Components/DashBoard/main-dash-board/main-dash-board.component';
import { OrdersComponent } from './Components/DashBoard/orders/orders.component';
import { ProductsComponent } from './Components/DashBoard/products/products.component';
import { UsersComponent } from './Components/DashBoard/users/users.component';
import { HomeComponent } from './Components/home/home.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { AuthGuard } from './guard/auth.guard';
// import { ProductDetailsComponent } from './Components/product-details/product-details.component';


const routes: Routes = [
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
  { path: 'Home', component: HomeComponent },
  { path: 'Home/:id', component: ProductDetailsComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'cart', component: CartComponent },
  { path: 'acount', component: AccountComponent },
  {
    path: 'category', component: CategoryComponent, children: [
      { path: 'Laptop', component: LabtopComponent },
      { path: 'Mobile', component: MobileComponent },
      { path: 'Television', component: TelevisionComponent }
    ]
  },
  {
    path: 'dashboardHome', canActivate: [AuthGuard], component: MainDashBoardComponent, children: [
      { path: 'dashboard', component: DashboardHomeComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'customers', component: CustomersComponent },
      { path: 'admins', component: AdminsComponent },
      { path: 'users', component: UsersComponent }
    ]
  },
  { path: 'products', component: ProductsComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
