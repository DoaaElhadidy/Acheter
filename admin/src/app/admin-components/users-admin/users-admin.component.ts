import { Component, OnInit } from '@angular/core';
import { MatDialog } from '../../../../node_modules/@angular/material';
import { DataService } from '../../data.service';
import { RestApiService } from '../../rest-api.service';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-users-admin',
  templateUrl: './users-admin.component.html',
  styleUrls: ['./users-admin.component.scss']
})
export class UsersAdminComponent implements OnInit {
  users: any=[];

  constructor(private data: DataService,private rest: RestApiService,private router:Router)
{}

  async ngOnInit() {
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

  deleteUser(index:number){
    let deletedUser :any= this.users[index];
    this.rest.remove(`http://localhost:3000/api/admin/accounts/users/${deletedUser._id}`);
      this.users.splice(index,1);
  }
}
