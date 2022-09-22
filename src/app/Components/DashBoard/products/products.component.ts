import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ImageService } from 'src/app/Services/image.service';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: any;
  subCategory: any;
  loading = false;
  hasError: boolean = false;
  selected = ""
  form!: FormGroup;
  form2!: FormGroup;
  allProduct: any[] = []
  productsID: string = ""
  updatedProductValue = {};
  updateValue = {};
  images: any[] = [];
  SubCategoryID = '';
  constructor(private productServic: ProductService, private builder: FormBuilder,
    private _ImageService: ImageService, private _ToastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.form = this.builder.group({
      nameAr: ['', [Validators.required, Validators.minLength(5)]],
      nameEn: ['', [Validators.required, Validators.minLength(5)]],
      detailsAr: ['', [Validators.required, Validators.minLength(15)]],
      detailsEn: ['', [Validators.required, Validators.minLength(15)]],
      price: ['', [Validators.required]],
      productImage: [''],
      quantity: ['', [Validators.required]],
      subCatID: ['', Validators.required]
    })
    this.form2 = this.builder.group({
      nameAr: ['', [Validators.required, Validators.minLength(5)]],
      nameEn: ['', [Validators.required, Validators.minLength(5)]],
      detailsAr: ['', [Validators.required, Validators.minLength(15)]],
      detailsEn: ['', [Validators.required, Validators.minLength(15)]],
      price: ['', [Validators.required]],
      productImage: [''],
      quantity: ['', [Validators.required]],
      subCatID: ['', Validators.required]
    })
    this.getAllProducts();
    this.getAllSubCategory();
    this.productServic.updateStatus.subscribe(() => {
      this.getAllProducts();
      this.getAllSubCategory();
    })

  }


  uploadPhoto(target: any) {

    if (!target || !target.files) return;
    var input = target as HTMLInputElement;
    if (!input.files) return;
    this.images = [];
    for (var i = 0; i < input.files.length; i++) {

      this._ImageService.uploadImage(input.files[i]).subscribe({
        next: (data) => {
          this.form.patchValue({ productImage: data._url[0] });

          this.images.push(data._url)
          console.log(this.images);
        },
        error: (err) => {
          console.log(err.error);
        }
      })

    }
  }





  AddProduct(data: FormGroup) {
    if (this.form.invalid) return;
    let object = {
      'nameAr': data.value.nameAr,
      'nameEn': data.value.nameEn,
      'detailsAr': data.value.detailsAr,
      'detailsEn': data.value.detailsEn,
      'price': data.value.price,
      'quantity': data.value.quantity,
      'subCatID': this.SubCategoryID
    }
    // let validObj = this.MakeObjValid(object);
    this.productServic.createProduct(object).subscribe({
      next: (data) => {
        for (let i = 0; i < this.images.length; i++) {
          let imageObj = {
            imageUrl: this.images[i][0],
            // 'ProductFK':data[data.length-1].productId,
            productId: data.productId,

          }
          console.log(imageObj);

          this._ImageService.addProductImages(imageObj).subscribe({
            next: (response) => {
              // this.GetAllProducts();
              // this.productform.reset();
              console.log(response);
            }
          });
        }
        this._ToastrService.success('Product Added Successfully');
        // this.GetAllProducts();
        // this.productform.reset();
        // this.closeModal?.nativeElement.click();
        // document.getElementById("closeModalButton").click();
      }
    })
  }






  // -------------------------------------------------------------------------------------------------------------------------
  getAllProducts() {
    this.loading = true
    this.productServic.getProducts().subscribe(data => {
      this.products = data;
      this.loading = false
      console.log(this.products)
    }, error => {
      console.log(error)
    })
  }
  getAllSubCategory() {
    this.loading = true;
    this.productServic.getSubCategoty().subscribe(data => {
      this.subCategory = data
      this.loading = false
    })
  }

  getSubCategoryValue(event: any) {


    if (event.target.value == "Laptop") {
      this.SubCategoryID = "1                             "
    } else if (event.target.value == "Mobile") {
      this.SubCategoryID = "2                             "
    } else if (event.target.value == "Television") {
      this.SubCategoryID = "3                             "
    }
    else {
      // SubCategoryID = 0
      this.hasError = true
    }



    console.log(this.SubCategoryID)

  }
  filterProducts(KeyWord: string) {
    this.loading = true
    this.productServic.getProductBySubCategory(KeyWord).subscribe(response => {
      this.products = response
      this.loading = false
    })
  }
  // Send Data To DataBase
  // addProduct() {
  //   const model = this.form.value
  //   this.productServic.createProduct(model).subscribe(response => {
  //     alert("Added Product success")
  //   })
  //   console.log(this.form)
  // }
  updatedValues(product: any) {
    this.updatedProductValue = {
      nameAr: product.nameAr,
      nameEn: product.nameEn,
      detailsAr: product.detailsAr,
      detailsEn: product.detailsEn,
      price: product.price,
      productImage: product.productImage,
      quantity: product.quantity,
    }
  }


  // Update Product
  updateProduct() {
    this.updateValue = {
      nameAr: this.form2.value.nameEn,
      detailsAr: this.form2.value.detailsAr,
      detailsEn: this.form2.value.detailsEn,
      price: this.form2.value.price,
      productImage: this.form2.value.productImage,
      quantity: this.form2.value.quantity,
    }
    console.log(this.updateValue);
    this.productServic.updateProduct(this.productsID, this.updateValue)
      .subscribe(data => console.log(data))
  }
  sendDataToModal(product: any) {
    this.productsID = product.productID
    // this.form2.value.nameEn = product.nameEn;
    // this.form2.value.detailsAr = product.detailsAr;
    // this.form2.value.detailsEn = product.detailsEn;
    // this.form2.value.price = product.price;
    // this.form2.value.productImage = product.productImage;
    // this.form2.value.quantity = product.quantity;
    this.form2.patchValue({
      nameAr: product.nameAr,
      nameEn: product.nameEn,
      detailsAr: product.detailsAr,
      detailsEn: product.detailsEn,
      price: product.price,
      quantity: product.quantity,
      productImage: product.productImage,
    })
  }


  // Delete Product
  deleteProduct(productID: string) {
    this.productServic.deletProduct(productID).subscribe(data => {
      this._ToastrService.success("Product Deleted Successfully");
    })
  }


  //  Validations
  get nameAr() {
    return this.form.get('nameAr')
  }
  get nameEn() {
    return this.form.get('nameEn')
  }
  get detailsAr() {
    return this.form.get('detailsAr')
  }
  get detailsEn() {
    return this.form.get('detailsEn')
  }
  get price() {
    return this.form.get('price')
  }
  get subCatID() {
    return this.form.get('subCatID')
  }
  get quantity() {
    return this.form.get('quantity')
  }

}
