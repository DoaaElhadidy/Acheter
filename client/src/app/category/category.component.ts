import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categoryId:any; //received from route
  category:any; //store category info 
  page=1;//store number of page is turned on 

  constructor(
    private data : DataService,
    private activatedRoute:ActivatedRoute,
    private rest :RestApiService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(res=>{
      this.categoryId=res['id'];
      this.getProducts();
    })
  }

//get least number of products  
  get lower(){
    return 10* (this.page-1)+1;
  }

  get upper(){
    return Math.min(10*this.page,this.category.totalProducts);
  }

  //? : optional parameter 
  async getProducts(event?:any){
    if(event){
      this.category=null;
    }
    try{
      const data = await this.rest.get(
        `http://localhost:3000/api/categories/${this.categoryId}?page=${this.page -1}`
      );
      data['success']
      ?(this.category=data)
      :this.data.error(data['message']);


    }catch(error){
this.data.error(['message']);
    }

  }
}
