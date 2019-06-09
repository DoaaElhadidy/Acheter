import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './data.service';
import { query } from '@angular/core/src/render3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  searchTerm='';
  isCollapsed = true;
  islogout=false;
  constructor(private router: Router,private data: DataService){
    this.data.getProfile();
    this.data.cartItems = this.data.getCart().length;
  }
  get token(){
    return localStorage.getItem('token');
  }
  collapse(){
    this.isCollapsed=true;
  }
  closeDropdown(dropdown){
    dropdown.close();
  }
  logout(){
    this.data.user={};
    this.data.cartItems = 0;
    this.islogout=true;
    localStorage.clear();
    this.router.navigate(['']);
  }
// if(islogout = true ){
//   this.data.getCart();
// }
  search(){
    if(this.searchTerm)
    {
      this.collapse();
      this.router.navigate(['search',{query:this.searchTerm}]);
    }
  }
}
