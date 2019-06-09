import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { RestApiService } from '../rest-api.service';
import { from } from 'rxjs';
import { HttpClient } from '../../../node_modules/@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email='';
  password='';
  btnDisabled= false;
  isAdmin:boolean=false ;
  users:any=[];

  constructor(
    private router:Router, 
    private data:DataService, 
    private rest: RestApiService,
    private http:HttpClient
  ) { }

  ngOnInit() {
  }

  validate() {
    if (this.email) {
      if (this.password) {
        return true;
      } else {
        this.data.error('Password is not entered');
      }
    } else {
      this.data.error('Email is not entered.');
    }
  }
// async checkAdmin(){
//   try{
//     const data = await this.rest.get(
//       'http://localhost:3000/api/accounts/users'
//     );
//     data['success']
//     ? (this.users = data['users'])
//     : this.data.error(data['message']);
//   } catch(error){
//     this.data.error(error['message']);
//   }
//   const user = this.users.filter(c=>c.email==this.email && c.password==this.password);
//   if(user!=null){
//     this.isAdmin= user.isAdmin;
//   }
//   return this.isAdmin;

// }



 checkAdmin():Boolean{
  try{
    const data = this.http.get('http://localhost:3000/api/accounts/users').subscribe(res=>{
      data['success']
      ? (this.users = data['users'])
      : this.data.error(data['message']);
  });

  } catch(error){
    this.data.error(error['message']);
  }
  const user = this.users.filter(c=>c.email==this.email && c.password==this.password);
  if(user!=null){
    this.isAdmin= user.isAdmin;
  }
  return this.isAdmin;

}
  // async login() {
  //   this.btnDisabled = true;
  //   try {
  //     if (this.validate()) {
  //       // if(!this.isAdmin){
  //       const data = await this.rest.post(
  //         'http://localhost:3000/api/accounts/login',
  //         {
  //           email: this.email,
  //           password: this.password,
  //         },
  //       );
  //       if(!this.checkAdmin()){
  //       if (data['success']) {
  //         localStorage.setItem('token', data['token']);
  //         await this.data.getProfile();
  //         this.router.navigate(['/profile']);
  //       } else {
  //         this.data.error(data['message']);
  //       }
  //     }

  //     else {
  //       if (data['success']) {
  //         localStorage.setItem('token', data['token']);
  //         await this.data.getHome();
  //         this.router.navigate(['/profile/admin']);
  //       } else {
  //         this.data.error(data['message']);
  //       }

  //     }
  //   }
  // } catch (error) {
  //     this.data.error(error['message']);
  //   }
  //   this.btnDisabled = false;
  // }
  async login() {
    this.btnDisabled = true;
    try {
      if (this.validate()) {
        const data = await this.rest.post(
          'http://localhost:3000/api/accounts/login',
          {
            email: this.email,
            password: this.password,
          },
        );
        if (data['success']) {
          localStorage.setItem('token', data['token']);
          await this.data.getProfile();
          if(!data['isAdmin'])
          {
            console.log("Unauthorized User ! ")
            this.router.navigate(['/profile']);}
        } else {
          this.data.error(data['message']);
        }
      }
    } catch (error) {
      this.data.error(error['message']);
    }
    this.btnDisabled = false;
  }
}