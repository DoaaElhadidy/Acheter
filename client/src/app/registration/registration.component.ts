import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '../../../node_modules/@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  name='';
  email='';
  password='';
  passwordConfirm='';
  isSeller= false;
  btnDisabled= false;
  
  form:FormGroup;
  constructor(private formBuilder:FormBuilder,private router: Router,private data: DataService,private rest: RestApiService) { }

  ngOnInit() {
    this.form=this.formBuilder.group({
      Name:['',[Validators.required , Validators.minLength(3),Validators.maxLength(10),Validators.pattern("^[a-zA-Z ]*$")]]
      ,Email:['',[Validators.required ,Validators.pattern("[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}")]]
      ,Password:['',[ Validators.required ,Validators.minLength(6),Validators.maxLength(20)]]
      ,ConfirmPassword:['',[Validators.required ]]
      
    });
  }

  validate() {
    if (this.name) {
      if (this.email) {
        if (this.password) {
          if (this.passwordConfirm) {
            if (this.password === this.passwordConfirm) {
              return true;
            } else {
              this.data.error('Passwords do not match');
            }
          } else {
            this.data.error('Confirmation Password is not entered');
          }
        } else {
          this.data.error('Password is not entered');
        }
      } else {
        this.data.error('Email is not entered');
      }
    } else {
      this.data.error('Name is not entered');
    }
  }
async register() {
    this.btnDisabled = true;
    try {
      if (this.validate()) {
        const data = await this.rest.post(
          'http://localhost:3000/api/accounts/signup',
          {
            name: this.name,
            email: this.email,
            password: this.password,
            passwordConfirm: this.passwordConfirm,
            isSeller: this.isSeller,
          },
        );
        if (data['success']) {
          localStorage.setItem('token', data['token']);
          this.data.success('Registration successful!');
          await this.data.getProfile();
          this.router.navigate(['profile/address'])
          .then(()=>{
            this.data.success(
              'Registeration Successful! Please enter your shipping address below'
            );
          }).catch(error=>this.data.error(error));
        } else {
          this.data.error(data['message']);
        }
      }
    }catch (error) {
      this.data.error(error['message']);
    }
    this.btnDisabled = false;
  }
}