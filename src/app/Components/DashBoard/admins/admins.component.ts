import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
})
export class AdminsComponent implements OnInit {
  admins:any[]=[];
  adminId:any;
  updatedAdminValues:any[]=[];
  constructor(private _userService:UserService) { }

  ngOnInit(): void {
    this.getAllAdmins();
  }

  getAllAdmins(){
    this._userService.getAllUser().subscribe(
      data=>{

        for (let i = 0; i < data.length; i++) {
          if(data[i].role==5){
          let obj = { userID: data[i].userID, nameAr: data[i].nameAr,nameEn: data[i].nameEn, email: data[i].email, phone: data[i].phone,role: data[i].role};
          this.admins.push(obj);
          }
        }
        console.log(data)
      }
    )
}
getAdminId(id:string){
  this.adminId=id;
}
updateValues(){
  this.updatedAdminValues = [
    {
      op: 'replace',
      value:0,
      path: '/role'
    }
  ]

}
removePermision(){
  this.updateValues();
  this._userService.updateUser(this.adminId,this.updatedAdminValues).subscribe(
    data=>{
      console.log(data);
    }
  )
}

}


