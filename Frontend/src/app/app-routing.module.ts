import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { ProductListComponent } from './product-list/product-list.component';
import {InfoProductComponent} from "./info-product/info-product.component";
import {CategoryListComponent} from "./category-list/category-list.component";
import {AddCategoryComponent} from "./add-category/add-category.component";
import {EditCategoryComponent} from "./edit-category/edit-category.component";
import {SigninComponent} from "./signin/signin.component";
import {AuthGuard} from "./auth.guard";
import {EditUserComponent} from "./edit-user/edit-user.component";


const routes: Routes = [
  { path: "", redirectTo: "home-page", pathMatch: "full" },
  { path: "home-page", component: HomePageComponent },
  { path: "login-page", component: LoginComponent },
  { path: "addProduct", component: AddProductComponent, canActivate: [AuthGuard]},
  { path: "editProduct/:id", component: EditProductComponent, canActivate: [AuthGuard]},
  { path: "userinfo", component: UserInfoComponent, canActivate: [AuthGuard]},
  { path: "productList", component: ProductListComponent, canActivate: [AuthGuard] },
  { path: "infoProduct/:id", component: InfoProductComponent, canActivate: [AuthGuard]},
  { path: "categoryList", component: CategoryListComponent, canActivate: [AuthGuard]},
  { path: "addCategory", component: AddCategoryComponent, canActivate: [AuthGuard]},
  { path: "editCategory/:id", component: EditCategoryComponent, canActivate: [AuthGuard]},
  { path: "signin-page", component: SigninComponent },
  { path: "editUser", component: EditUserComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
