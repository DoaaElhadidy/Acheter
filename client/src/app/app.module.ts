import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MessageComponent } from './message/message.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';

import { RestApiService } from './rest-api.service';
import { DataService } from './data.service';
import { AuthGuardService } from './auth-guard.service';
import { CategoriesComponent } from './categories/categories.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { AddressComponent } from './address/address.component';
import { SearchComponent } from './search/search.component';
import { PostproductComponent } from './postproduct/postproduct.component';
import { MyproductsComponent } from './myproducts/myproducts.component';
import { CartComponent } from './cart/cart.component';
import { ProductComponent } from './product/product.component';
// import { MyordersComponent } from './myorders/myorders.component';
import { CategoryComponent } from './category/category.component';
import { MyordersComponent } from './myorders/myorders.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MessageComponent,
    RegistrationComponent,
    LoginComponent,
    CategoriesComponent,
    ProfileComponent,
    SettingsComponent,
    AddressComponent,
    SearchComponent,
    PostproductComponent,
    MyproductsComponent,
    CartComponent,
    ProductComponent,
    // MyordersComponent,
    CategoryComponent,
    MyordersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    FormsModule,ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [RestApiService,DataService,AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }