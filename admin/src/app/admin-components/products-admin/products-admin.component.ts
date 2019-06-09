import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import { RestApiService } from '../../rest-api.service';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.component.html',
  styleUrls: ['./products-admin.component.scss']
})
export class ProductsAdminComponent implements OnInit {

  products:any=[];


  constructor(private data:DataService,
  private rest:RestApiService,
  private activatedRoute:ActivatedRoute,
  private router: Router){}
  
  
  async ngOnInit(){ 
    try{
     
      const data = await this.rest.get(
        'http://localhost:3000/api/products'
      );
      data['success']
      ? (this.products = data['products'])
      : this.data.error(data['message']);
    } catch(error){
      this.data.error(error['message']);
    }
  }
  
  deleteProduct(index:number){
    let deletedProduct :any= this.products[index];
    this.rest.remove(`http://localhost:3000/api/admin/products/${deletedProduct._id}`);
      this.products.splice(index,1);
  }
}
