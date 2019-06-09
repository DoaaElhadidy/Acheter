import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from '../rest-api.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  product: any;
  myReview = {
    title:'',
    description:'',
    rating:0
  };
  btnDisabled = false;

  constructor(
    private data:DataService,
    private rest:RestApiService,
    private activatedRoute:ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(res => {
      this.rest.get(`http://localhost:3000/api/product/${res['id']}`)
      .then(data =>{
        data['success']
        ? (this.product = data['product'])
        : this.router.navigate(['/']);
      }).catch(error=> this.data.error(error['message']));
    });
  }
  validate(){
    if(this.myReview.title){
      if(this.myReview.description){
        if(this.myReview.rating){
          return true;
        }else{
      this.data.error('Rate Must Be Entered..');
        }
      }else{
      this.data.error('Description Must Be Entered..');
      }
    }else{
    this.data.error('Title Must Be Entered..');
    }
  }
  async postReview(){
    if(this.data.user){ 
      if(this.validate()) {
      this.btnDisabled = true;
    try{
      const data = await this.rest.post(
        'http://localhost:3000/api/review',
        {
          productId: this.product._id,
          title: this.myReview.title,
          description: this.myReview.description,
          rating: this.myReview.rating
        }
      );
      data['success']
      ? this.data.success(data['message'])
      : this.data.error(data['message']);
    }catch(error){
      this.data.error(error['message'])
    }
  }
  }else{
    this.data.error('You Must Be Logged In..');
  }
}
  addToCart(){
    this.data.addToCart(this.product)
    ? this.data.success('Product successfully added to cart.')
    : this.data.error('Product has already been added to cart.');
  }
}