import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {


  constructor(private _AuthService: AuthService, private _Router: Router, private _ToastrService: ToastrService) { }

  ngOnInit(): void {

  }


  signInForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.required])
  })
  signin() {
    if (this.signInForm.invalid) {
      this._ToastrService.error("Your Email or Password is not Valid", 'Error')
      return;
    }
    this._AuthService.signin(this.signInForm.value).subscribe(response => {

      if (response.message == 'success') {
        localStorage.setItem('token', response.token)
        this._AuthService.saveData();
        this._ToastrService.success("You Are Logged in Succeessfully", "Success");
        this._Router.navigateByUrl('/Home');

      }
      else {
        this._ToastrService.error(response.message, 'Error')
      }



    })

  }

}
