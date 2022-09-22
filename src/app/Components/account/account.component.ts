import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/Services/account.service';
import { OrderService } from 'src/app/Services/order.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  userId = `${localStorage.getItem('id')}`;
  accountForm: any;
  accountData: any;
  updatedValues: any[] = [];
  updatedAddressValues: any[] = [];
  orderDetails: any[] = [];
  hasOrders = false;
  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private _OrderService: OrderService,
    private _ToastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getAccountInfo();
    this.getOrderDetails();
  }

  getOrderDetails() {
    this._OrderService.getOrderDetails().subscribe(Response => {
      console.log(Response[0].orderDetails[0]);

      for (let i = 0; i < Response.length; i++) {
        let obj = {
          totalPrice: Response[i].orderDetails[0].totalPrice,
          deliveryDate: Response[i].orderDetails[0].deliveryDate,
          quantity: Response[i].orderDetails[0].quantity,
        }
        this.orderDetails.push(obj);
      }
      if (this.orderDetails != null) {
        this.hasOrders = true;
      }
    })
  }


  getAccountInfo() {
    this.accountService.getAccountDataById(this.userId).subscribe((data) => {
      this.accountData = data;
      // console.log(data)
      // console.log(data.addresses[0]);
      this.accountForm = this.fb.group({
        nameAr: [this.accountData?.nameAr, Validators.required],
        nameEn: [this.accountData?.nameEn, Validators.required],
        phone: [this.accountData?.phone, [Validators.required]],
        country: [this.accountData?.addresses[0]?.country],
        street: [this.accountData?.addresses[0]?.street],
        building: [this.accountData?.addresses[0]?.building],
        floor: [this.accountData?.addresses[0]?.floor],
        flat: [this.accountData?.addresses[0]?.flat],
        notes: [this.accountData?.addresses[0]?.notes],
      });
    });
  }

  onSubmit() {
    this.updateAccountInfo();
  }

  updateData() {
    this.updatedValues = [
      {
        op: 'replace',
        value: this.accountForm.value.nameAr += " ",
        path: '/nameAr',
      },
      {
        op: 'replace',
        value: this.accountForm.value.nameEn += " ",
        path: '/nameEn',
      },
      {
        op: 'replace',
        value: this.accountForm.value.phone += " ",
        path: '/phone',
      },
    ];
  }

  updateAddress() {
    this.updatedAddressValues = [
      {
        op: 'replace',
        value: this.accountForm.value.country += " ",
        path: '/country',
      },
      {
        op: 'replace',
        value: this.accountForm.value.street += " ",
        path: '/street',
      },
      {
        op: 'replace',
        value: this.accountForm.value.building += " ",
        path: '/building',
      },
      {
        op: 'replace',
        value: this.accountForm.value.floor,
        path: '/floor',
      },
      {
        op: 'replace',
        value: this.accountForm.value.flat,
        path: '/flat',
      },
      {
        op: 'replace',
        value: this.accountForm.value.notes + " ",
        path: '/notes',
      },
    ];
  }
  updateAccountInfo() {
    if (this.accountForm.valid) {
      //will be true only if all form properties satisfy the validations
      this.updateData();
      this.accountService
        .updateAccountData(this.userId, this.updatedValues)
        .subscribe(
          () => this.onUpdateComplete(),
          (error: HttpErrorResponse) => {
            this._ToastrService.error('error occured');
          },
          () => {
            this._ToastrService.success('Successfully Updated');
          }
        );
      this.updateAddress();
      this.accountService
        .updateAddressData(
          this.accountData.addresses[0].addressID,
          this.updatedAddressValues
        )
        .subscribe((data) => {
          console.log(data);
        });
    }
  }

  onUpdateComplete(): void {
    this.accountForm.reset();
  }


}
