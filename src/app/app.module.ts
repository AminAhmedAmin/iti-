import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { BodyComponent } from './Components/body/body.component';
import { FooterComponent } from './Components/footer/footer.component';
import { HomeComponent } from './Components/home/home.component';
import { SignInComponent } from './Components/Auth/sign-in/sign-in.component';
import { SignUpComponent } from './Components/Auth/sign-up/sign-up.component';
import { TestComponent } from './Components/test/test.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { SearchPipe } from './Pipes/search.pipe';
import { SeemorePipe } from './Pipes/seemore.pipe';
import { ProductNumPipe } from './Pipes/product-num.pipe';
import { CartComponent } from './Components/cart/cart.component';
import { LabtopComponent } from './Components/category/labtop/labtop.component';
import { MobileComponent } from './Components/category/mobile/mobile.component';
import { TelevisionComponent } from './Components/category/television/television.component';
import { CategoryComponent } from './Components/category/category/category.component';
import { AccountComponent } from './Components/account/account.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ProductsComponent } from './Components/DashBoard/products/products.component';
import { SpinnerComponent } from './Components/spinner/spinner.component';
import { GetSubCategoryNamePipe } from './Pipes/get-sub-category-name.pipe';
import { MainDashBoardComponent } from './Components/DashBoard/main-dash-board/main-dash-board.component';
import { NavBarComponent } from './Components/DashBoard/nav-bar/nav-bar.component';
import { OrdersComponent } from './Components/DashBoard/orders/orders.component';
import { DashboardHomeComponent } from './Components/DashBoard/dashboard-home/dashboard-home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdminsComponent } from './Components/DashBoard/admins/admins.component';
import { UsersComponent } from './Components/DashBoard/users/users.component';
import { CustomersComponent } from './Components/DashBoard/customers/customers.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    HomeComponent,
    SignInComponent,
    SignUpComponent,
    TestComponent,
    ProductDetailsComponent,
    PageNotFoundComponent,
    SearchPipe,
    SeemorePipe,
    ProductNumPipe,
    CartComponent,
    LabtopComponent,
    MobileComponent,
    TelevisionComponent,
    CategoryComponent,
    AccountComponent,
    ProductsComponent,
    SpinnerComponent,
    GetSubCategoryNamePipe,
    MainDashBoardComponent,
    NavBarComponent,
    OrdersComponent,
    ProductsComponent,
    DashboardHomeComponent,
    AdminsComponent,
    UsersComponent,
    CustomersComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
