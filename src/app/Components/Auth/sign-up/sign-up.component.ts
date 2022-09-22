import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  constructor(private _AuthService: AuthService, private _Router: Router, private _ToastrService: ToastrService) { }

  ngOnInit(): void {
  }

  signUpForm: FormGroup = new FormGroup({
    nameAr: new FormControl(null),
    nameEn: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    phone: new FormControl(null, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required])
  });


  signup() {
    if (this.signUpForm.invalid) {
      this._ToastrService.error("Your Data is not Valid", 'Error')
      return
    }
    console.log(this.signUpForm.value);
    this._AuthService.signup(this.signUpForm.value).subscribe(respose => {
      console.log(respose);
      this._ToastrService.success("You Are Signed Up Succeessfully", "Success");


      this._Router.navigateByUrl('/signin');
    })

  }




}
