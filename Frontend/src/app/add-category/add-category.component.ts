import { Component } from '@angular/core';
import {Product} from "../services/product/product";
import {Category} from "../services/category/category";
import {CategoryService} from "../services/category/category.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {
  newCategorie = new Category();
  categories! : Category[];

  constructor(private categoryService : CategoryService, private router : Router) {
  }

  addCategory() {
    this.categoryService.addCategory(this.newCategorie).subscribe(p =>{
      this.router.navigate(['categoryList']);
    })
  }
}
