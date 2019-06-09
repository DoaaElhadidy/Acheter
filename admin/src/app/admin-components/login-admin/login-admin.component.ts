import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';
import { DataService } from '../../data.service';
import { RestApiService } from '../../rest-api.service';
import { HttpClient } from '../../../../node_modules/@angular/common/http';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.scss']
})
export class LoginAdminComponent implements OnInit {
  email='';
  password='';
  btnDisabled= false;
  user:any={} ;
  users:any=[];
  constructor(
    private router:Router, 
    private data:DataService, 
    private rest: RestApiService,
    private http:HttpClient
  ) { }

  async ngOnInit() {
    this.data.user={};
    localStorage.clear();
    try{
      const data = await this.rest.get(
        'http://localhost:3000/api/accounts/users'
      );
      data['success']
      ? (this.users = data['users'])
      : this.data.error(data['message']);
    } catch(error){
      this.data.error(error['message']);
    }
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
  async login() {
    this.btnDisabled = true;
    try {
      if (this.validate()) {
        const data = await this.rest.post(
          'http://localhost:3000/api/accounts/login/admin',
          {
            email: this.email,
            password: this.password,
          },
        );

  //  this.user= this.users.filter(c=>c.email==this.email && c.password==this.password);
        if(this.user!=null){

        if (data['success']) {
          localStorage.setItem('token', data['token']);
          await this.data.getHome();
          if(data['isAdmin'])
          { 
            this.router.navigate(['/admin/users']);
        }
          else {

            this.router.navigate(['/admin/login'])
            .then(()=>{
              this.data.warning('Unauthorized Admin');
            });
            console.log("Unauthorized Admin ! ");
            this.data.error(data['message']);
          }
        } 
        
        else {
          this.data.error(data['message']);
        }
      }
   else {
    this.router.navigate(['/admin/login'])
    .then(()=>{
      this.data.warning(' User Not Exist !');
    });
     console.log("User Not Exist !");
   }
    }
    } catch (error) {
      this.data.error(error['message']);
    }
    this.btnDisabled = false;
  }
}
