import { Component, OnInit,Inject } from '@angular/core';
import { DataService } from '../../data.service';
import { RestApiService } from '../../rest-api.service';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import {MatDialog} from '@angular/material';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClient } from '../../../../node_modules/@angular/common/http';

export interface DialogData{
  //  catName:string;
  category:any;
 }

@Component({
  selector: 'app-categories-admin',
  templateUrl: './categories-admin.component.html',
  styleUrls: ['./categories-admin.component.scss']
})
export class CategoriesAdminComponent implements OnInit {
isPopupOpened = true;
catName:string;
  categories: any;
  btnDisabled= false;
  newCategory:any;
  constructor(private http:HttpClient,private dialog:MatDialog,private data: DataService,private rest: RestApiService,private router:Router,private activatedRoute:ActivatedRoute) {
    var snapshot = activatedRoute.snapshot;
  
  }
  openDialog(category:any): void {
    //
    this.data.ID=category._id;
    let dialogRef = this.dialog.open(EditDialogComponent, {
      data: category
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      
    });
  }


  async ngOnInit() {
    try{
      const data = await this.rest.get(
        'http://localhost:3000/api/categories'
      );
      data['success']
      ? (this.categories = data['categories'])
      : this.data.error(data['message']);
    } catch(error){
      this.data.error(error['message']);
    }
  }
//   isExist() {
//     return this.categories.filter(x=>x.name==this.catName)
//   }
//   addCategory(){
//     if(this.catName===""){}
//     else {
//       if(!this.isExist()){
// let cat ={name:""};
// cat.name=this.catName;
// this.http.post("http://localhost:3000/api/categories",cat).subscribe(response=>{
//   let id: number = response as number;
//   if (id == 0) {
//     alert("Not Inserted ! Error!!!");
//   }
//   else  {
//     this.categories.unshift(cat);
//   }

// },
// error => { alert("Error has occured! "); }
// );

//       }
//     }
//   }


  async addCategory(){
    this.btnDisabled= true;
   this.catName= this.newCategory.name;
    try{
      const data = await this.rest.post(
        'http://localhost:3000/api/categories',
       { category: this.newCategory }
      );
      data['success']
      ? this.data.success(data['message'])
      : this.data.error(data['message']);
    } catch(error){
      this.data.error(error['message']);
    }
    finally{
    this.btnDisabled= false;
  // this.categories.unshift(this.newCategory);
  // this.router.navigate(['./admin/categories']);
 
  }
}

  viewCategory(catName:string){
    this.router.navigate(['./product'],{queryParams:{category:`${catName}`}});
  }

  edit(category:any){
    // this.dialogRef.close("It was Edited Successfuly ");
    //Logic of Edit here 
    // this.isPopupOpened=true;

    
    let dialogRef = this.dialog.open(EditDialogComponent, {
      data:{
        catName :this.catName
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
  });


  // edit(id:number){
  //   // this.dialogRef.close("It was Edited Successfuly ");
  //   //Logic of Edit here 
  //   // this.isPopupOpened=true;

  //   const category = this.categories.find(c=>c._id==id);
    
  //   let dialogRef = this.dialog.open(EditDialogComponent, {
  //     data:{
  //       category :category
  //     }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     console.log(result);
  // });


}

  deleteCategory(index:number){
    let deleteCategory :any= this.categories[index];
    this.rest.remove(`http://localhost:3000/api/admin/category/${deleteCategory._id}`);
      this.categories.splice(index,1);
  }

}

