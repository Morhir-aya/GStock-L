import { Component } from '@angular/core';
import {Product} from "../services/product/product";
import {Category} from "../services/category/category";
import {ProductService} from "../services/product/product.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  newProduct = new Product();
  categories! : Category[];
  newCategory! : Category;
  newCategoryId! : number;

  constructor(private productService : ProductService, private router : Router) {
    productService.categoriesList().subscribe(c =>{
      this.categories = c;
    })


  }

  addProduct() {
    this.newProduct.category = this.categories.find(c =>c.idCategory  == this.newCategoryId);
    this.productService.addProduct(this.newProduct).subscribe(p =>{
      this.router.navigate(['productList']);
    })
  }
}
