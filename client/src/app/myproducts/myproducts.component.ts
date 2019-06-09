import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-myproducts',
  templateUrl: './myproducts.component.html',
  styleUrls: ['./myproducts.component.scss']
})
export class MyproductsComponent implements OnInit {

  products: any;
  constructor(private data: DataService,private rest: RestApiService) { }

 async ngOnInit() {
    try{
      const data = await this.rest.get(
        'http://localhost:3000/api/seller/products'
      );
      data['success']
      ? (this.products = data['products'])
      : this.data.error(data['message']);
    } catch(error){
      this.data.error(error['message']);
    }
  }
}
