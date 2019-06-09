import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './data.service';
import { query } from '@angular/core/src/render3';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CategoriesAdminComponent } from './admin-components/categories-admin/categories-admin.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  searchTerm='';
  isCollapsed = true;
  constructor(private router: Router,private data: DataService,public dialog: MatDialog){
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
    localStorage.clear();
    this.router.navigate(['/admin/login']);
  }
  search(){
    if(this.searchTerm)
    {
      this.collapse();
      this.router.navigate(['search',{query:this.searchTerm}]);
    }
  }
  // openModal() {
  //   const dialogConfig = new MatDialogConfig();
  //  dialogConfig.disableClose = true;
  //   dialogConfig.autoFocus = true;
  //   dialogConfig.data = {
  //   id: 1,
  //   title: 'Angular For Beginners'
  //   };
  //  const dialogRef = this.dialog.open(CategoriesAdminComponent, dialogConfig);
  //  dialogRef.afterClosed().subscribe(result => {
  //   console.log("Dialog was closed" )
  //  console.log(result)
  //  });
  //   }
}
