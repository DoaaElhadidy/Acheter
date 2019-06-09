import { Component, OnInit } from '@angular/core';
import {environment } from '../../environments/environment';
import { RestApiService } from '../rest-api.service';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  btnDisabled= false;
  handler: any;
  quantities= [];
  products = [];
//   order={
// totalPrice:0
//   };
// product={
//     image:'',
//     title:'',
//     description:'',
//     price:'',
//     quantity:''
// };

constructor(private router: Router,private data: DataService,private rest: RestApiService) { }

trackByCartItems(index: number,item: any)
{
  return item._id;
}
get cartItems(){
  return this.data.getCart();
}
get cartTotal(){
  let total= 0;
  this.cartItems.forEach((data,index)=>{
    total +=data['price'] * this.quantities[index];
  });
  return total;
}

  removeProduct(index,product){
    this.quantities.splice(index,1);
    this.data.removeFromCart(product);
  }

   ngOnInit() {
    this.cartItems.forEach(data=>{
      this.quantities.push(1);
    });
    this.handler = StripeCheckout.configure({
      key: environment.stripekey,
      image: 'assets/img/logo.png',
      locale:'auto',
      token: async stripeToken =>{
        let products;
        products=[];
        this.cartItems.forEach((d,index)=>{
          this.products.push({
            product: d['_id'],
            quantity: this.quantities[index],
            // producttitle: d['title']
          });
        });
try{
  const data = await this.rest.post(
    'http://localhost:3000/api/accounts/order',
    {
      totalPrice: this.cartTotal,
      products,
      stripeToken
    }
  );
    data['success']
    ? (this.data.clearCart(), this.data.success('Purchase Successful'),  console.log(this.products))
    : this.data.error(data['message']);
  }catch(error){
    this.data.error(error['message']);
  }
    }
      }); 
}
// async postOrders()
// {

//   try
//   {
//     const data = await this.rest.post(
//     'http://localhost:3000/api/accounts/order', this.products
//     // {
//     //   addToOrder(){
//     //     this.data.addToOrder(this.product)
//     //     ? this.data.success('You successfully ordered a product')
//     //     : this.data.error('Failed to order');
//     //   }
//     // },
//     );
  
//     if(data['success']){
//     this.router.navigate(['/profile/myorders'])
//     .then(()=>{this.data.success(data['message'])})
//     .catch(error =>this.data.error(error))
//     ? this.data.success(data['message'])
//     : this.data.error(data['message']);
//   }}
//   catch (error) {
//     this.data.error(error['message']);
//   }
// }
validate(){
  if(!this.quantities.every(data => data > 0)){
    this.data.warning('Quantity cannot be less than one');
  }else if(!localStorage.getItem('token')){
    this.router.navigate(['/login'])
    .then(()=>{
      this.data.warning('you need to login before making a purchase');
    });
    }
    else if(!this.data.user['address']){
      this.router.navigate(['/profile/address'])
      .then(()=>{
        this.data.warning('you need to login before making a purchase');
      });
    } else{
      this.data.message = ' ';
      return true;
    }
  }

  checkout(){
    this.btnDisabled = true;
    try{
      if(this.validate()){
        this.handler.open({
          name:'ecommerce',
          description: 'Checkout Payment',
          amount: this.cartTotal * 100,
          closed: () =>{
            this.btnDisabled = false;
            this.router.navigate(['/profile/myorders'])
          }
        });
      }else{
        this.btnDisabled = false;
      }
    }
    catch(error)
    {
     this.data.error(error); 
    }
 }
}