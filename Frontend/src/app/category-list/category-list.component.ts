import { Component } from '@angular/core';
import {Category} from "../services/category/category";
import {CategoryService} from "../services/category/category.service";
import {Product} from "../services/product/product";
import {AuthService} from "../services/Auth/auth.service";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent {
  categories! : Category[];
  constructor(private categoryService : CategoryService, private authService : AuthService) {
    categoryService.categoriesList().subscribe(p=>{
      console.log(p);
      this.categories = p;
    })
  }

  loadCategories(){
    this.categoryService.categoriesList().subscribe(p =>{
      this.categories = p;
    })
  }

  deleteCategory(category : Category){
    let message = confirm("Are you sure you want to delete this product?");
    if (message)
      this.categoryService.deleteCategory(category.idCategory!).subscribe(()=>{
        this.loadCategories();
      });
  }

  loadCat(searchKey : String){
    this.categoryService.categoriesList(searchKey).subscribe(p =>{
      this.categories = p;
    })
  }

  searchByKeyword(searchkeyword : String){
    console.log(searchkeyword);
    this.categories = [];
    this.loadCat(searchkeyword)

  }

}
