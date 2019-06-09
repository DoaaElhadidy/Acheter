import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component'
import { SettingsComponent } from './settings/settings.component'
import { AddressComponent } from './address/address.component'
import { CategoriesComponent } from './categories/categories.component';
import { PostproductComponent} from './postproduct/postproduct.component';
import { MyproductsComponent } from './myproducts/myproducts.component';
import { ProductComponent } from './product/product.component';
import { SearchComponent } from './search/search.component';
import { CartComponent } from './cart/cart.component';
import { AuthGuardService } from './auth-guard.service';
import { MyordersComponent } from './myorders/myorders.component';
import { CategoryComponent } from './category/category.component';

const routes: Routes = [
  {
    path:'register',
    component:RegistrationComponent,
    canActivate:[AuthGuardService]
  },
  {
    path:'login',
    component:LoginComponent,
    canActivate:[AuthGuardService]
  },
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'profile',
    component:ProfileComponent,
    canActivate:[AuthGuardService]
  },
  {
    path:'profile/settings',
    component:SettingsComponent,
    canActivate:[AuthGuardService]
  },
  {
    path:'profile/address',
    component:AddressComponent,
    canActivate:[AuthGuardService]
  },
  {
    path:'profile/postproduct',
    component:PostproductComponent,
    canActivate:[AuthGuardService]
  },
  {
    path:'profile/myproducts',
    component:MyproductsComponent,
    canActivate:[AuthGuardService]
  },
  {
    path:'profile/myorders',
    component:MyordersComponent,
    canActivate:[AuthGuardService]
  },
  {
    path:'categories',
    component:CategoriesComponent
  },
  {
    path:'categories/:id',
    component: CategoryComponent
  },
  {
    path:'search',
    component:SearchComponent
  },
  {
    path:'product/:id',
    component:ProductComponent
  },
  {
    path:'cart',
    component:CartComponent
  },
  {
    path:'**',
    redirectTo:''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
