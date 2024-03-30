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
const routes: Routes = [
  { path: "", redirectTo: "home-page", pathMatch: "full" },
  { path: "home-page", component: HomePageComponent },
  { path: "login-page", component: LoginComponent },
  { path: "addProduct", component: AddProductComponent},
  { path: "editProduct/:id", component: EditProductComponent,},
  { path: "userinfo", component: UserInfoComponent,},
  { path: "productList", component: ProductListComponent,},
  { path: "infoProduct/:id", component: InfoProductComponent,},
  { path: "categoryList", component: CategoryListComponent,},
  { path: "addCategory", component: AddCategoryComponent,},
  { path: "editCategory/:id", component: EditCategoryComponent,},
  { path: "signin-page", component: SigninComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
