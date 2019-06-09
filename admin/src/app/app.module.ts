import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, FormBuilder } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';

import { RestApiService } from './rest-api.service';
import { DataService } from './data.service';
import { AuthGuardService } from './auth-guard.service';

import { CategoriesAdminComponent } from './admin-components/categories-admin/categories-admin.component';
import { ProductsAdminComponent } from './admin-components/products-admin/products-admin.component';
import { UsersAdminComponent } from './admin-components/users-admin/users-admin.component';
import { HomeAdminComponent } from './admin-components/home-admin/home-admin.component';
import {MatDialogModule, MatTableModule, MatCheckboxModule, MatButtonModule} from "@angular/material";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { EditDialogComponent } from './admin-components/edit-dialog/edit-dialog.component';

import { LoginAdminComponent } from './admin-components/login-admin/login-admin.component';
import { MessageComponent } from './message/message.component';

@NgModule({
  declarations: [
    AppComponent,
  
    CategoriesAdminComponent,
    ProductsAdminComponent,
    UsersAdminComponent,
    HomeAdminComponent,
    EditDialogComponent,
    LoginAdminComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatTableModule
    

  ],
  entryComponents:[
    EditDialogComponent
  ],
  providers: [RestApiService,DataService,AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }