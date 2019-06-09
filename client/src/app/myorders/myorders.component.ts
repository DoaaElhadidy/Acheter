import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.scss']
})
export class MyordersComponent implements OnInit {

  orders:any;
  // order.products.find((product)=>{return product._id == "5c7a85e5c3574c08cc4b0a59"}).title }}
  products:any;
  constructor(private data: DataService,private rest: RestApiService) { }

  async ngOnInit() {
    try{
      const data = await this.rest.get(
        'http://localhost:3000/api/accounts/orders'
      );
      data['success']
      ? (this.orders = data['orders'])
      : this.data.error(data['message']);
      console.log(this.orders);

    }
    catch(error){
      this.data.error(error['message']);
    }
      const data =  await this.rest.get(
        'http://localhost:3000/api/products'
      );
      data['success']
      ? (this.products = data['products'])
      : this.data.error(data['message']);
      // console.log(this.products.find(ww=>ww._id == this.orders.products._id).title);
      console.log(this.orders);
    }
  }

  


