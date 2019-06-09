import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }
//Authenticate any url starts with admin  to prevent any one to enter correct url and vieew data 
  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
    if(localStorage.getItem('token')){
      return state.url.startsWith('/admin')
      ? true 
      : (this.router.navigate(['/']),false);
    }else{
      return state.url.startsWith('/admin')
      ? (this.router.navigate(['/']),false)
      : true;
    }
  

//if user is logged-in don't show login-form 
    if(localStorage.getItem('token')){
    this.router.navigate(['./']);
    return false;}
    else {
      return true ; 
    }
     }
  }

//a3ml token fl ts w ashohofha 