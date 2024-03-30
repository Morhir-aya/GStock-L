import { Component } from '@angular/core';
import {Product} from "../services/product/product";
import {Category} from "../services/category/category";
import {ProductService} from "../services/product/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryService} from "../services/category/category.service";

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent {
  currentCategory = new Category();

  constructor(private categoryService : CategoryService,
              private activatedRoute : ActivatedRoute,
              private router : Router
  ) {}

  ngOnInit() {
    this.categoryService.editCategory(this.activatedRoute.snapshot.params['id']).subscribe(p=>{
      this.currentCategory = p;
    })
  }

  updateCategory(){
    this.categoryService.updateCategory(this.currentCategory).subscribe(p=>{
      this.router.navigate(['categoryList']);
    })
  }
}
