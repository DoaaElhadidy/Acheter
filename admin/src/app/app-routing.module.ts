import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';
import { HomeAdminComponent } from './admin-components/home-admin/home-admin.component';
import { UsersAdminComponent } from './admin-components/users-admin/users-admin.component';
import { CategoriesAdminComponent } from './admin-components/categories-admin/categories-admin.component';
import { ProductsAdminComponent } from './admin-components/products-admin/products-admin.component';
import { LoginAdminComponent } from './admin-components/login-admin/login-admin.component';


const routes: Routes = [
  {
    path:'home',
    component:HomeAdminComponent,
    // canActivate:[AuthGuardService]

  },

  {
    path:'admin/login',
    component:LoginAdminComponent,
    canActivate:[AuthGuardService]
  },
 
 

 

  // {path:'admin',component: HomeAdminComponent},
  // {path:'admin/home',component: HomeAdminComponent},
//   {path:'profile/admin',component: HomeAdminComponent,
//     canActivate:[AuthGuardService]

// },
{
  path:'',
  component:LoginAdminComponent,
  // redirectTo:'/admin/login',pathMatch:'full'
}, 

  {path:'admin/users',component: UsersAdminComponent,canActivate:[AuthGuardService]
},
  {path:'admin/categories',component: CategoriesAdminComponent,canActivate:[AuthGuardService]
},
  {path:'admin/products',component: ProductsAdminComponent,canActivate:[AuthGuardService]
},

  {
    path:'**',
    redirectTo:''
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
