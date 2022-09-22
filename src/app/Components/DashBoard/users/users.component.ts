import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users:any[]=[];
  userId:any;
  updatedUserValues:any[]=[];
  constructor(private _userService:UserService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(){
    this._userService.getAllUser().subscribe(
      data=>{

        for (let i = 0; i < data.length; i++) {
          if(data[i].role!=5){
          let obj = { userID: data[i].userID, nameAr: data[i].nameAr,nameEn: data[i].nameEn, email: data[i].email, phone: data[i].phone,role: data[i].role};
          this.users.push(obj);
          }
        }
        console.log(data)
      }
    )
}
getUserId(id:string){
  this.userId=id;
}

removeUser(){
  this._userService.deleteUser(this.userId).subscribe(
    data=>{
      console.log(data);
    }
  )
}
updateValues(){
  this.updatedUserValues = [
    {
      op: 'replace',
      value:5,
      path: '/role'
    }
  ]

}
givePermision(){
  this.updateValues();
  this._userService.updateUser(this.userId,this.updatedUserValues).subscribe(
    data=>{
      console.log(data);
    }
  )
}

}
