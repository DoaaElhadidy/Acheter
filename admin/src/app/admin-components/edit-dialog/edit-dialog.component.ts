import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef ,MAT_DIALOG_DATA} from '../../../../node_modules/@angular/material';
import { RestApiService } from '../../rest-api.service';
import { DataService } from '../../data.service';
import{DialogData} from '../categories-admin/categories-admin.component';
@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {
  newCatName :string;
  name:string;
  categories:any;
  btnDisabled = false;
  constructor(private dataService: DataService,private rest: RestApiService,public dialogRef:MatDialogRef<EditDialogComponent>,@Inject(MAT_DIALOG_DATA)public data:any) { }
//MAT_DIALOG_DATA to move data between dialog and host
   ngOnInit() {

     
    }


//   edit(category:any){
//     // this.dialogRef.close("It was Edited Successfuly ");
//     //Logic of Edit here
//     const index = this.categories.findIndex(c=>c._id===category._id);
//     this.categories[index]=category;

//   }


//Course 
async edit(){
const category = this.data.category;

  this.btnDisabled = true;
  try{
    const res = await this.rest.update(`http://localhost:3000/api/admin/${category._id}`);
    res['success']
    ? (this.data.success(res['message']),console.log('Edited Successfuly') )
    :  this.data.error(res['message']);
  } catch(error){
    this.data.error(error['message']);
  }
  finally{
    this.btnDisabled = false;

    }
}



    // const index = this.categories.findIndex(c=>c._id==this.dataService.ID);
    // const category= this.categories.find(c=>c._id==this.dataService.ID);
    // this.categories[index]=category;

}




