import {Component, OnInit} from '@angular/core';
import {Product} from "../services/product/product";
import {ProductService} from "../services/product/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Category} from "../services/category/category";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit{
  currentProduct = new Product();
  categories! : Category[];
  newCategory! : Category;
  newCategoryId! : number;
  constructor(private productService : ProductService,
              private activatedRoute : ActivatedRoute,
              private router : Router
              ) {}

  ngOnInit() {
    this.productService.categoriesList().subscribe(c =>{
      this.categories = c;
    })
    this.productService.editProduct(this.activatedRoute.snapshot.params['id']).subscribe(p=>{
      this.currentProduct = p;
      this.newCategoryId = this.currentProduct.category?.idCategory!;
    })
  }

  updateProduct(){
    this.currentProduct.category = this.categories.find(c=>c.idCategory == this.newCategoryId);
    this.productService.updateProduct(this.currentProduct).subscribe(p=>{
      this.router.navigate(['productList']);
    })
  }
}
