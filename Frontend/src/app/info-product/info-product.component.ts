import { Component } from '@angular/core';
import {ProductService} from "../services/product/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../services/product/product";
@Component({
  selector: 'app-info-product',
  templateUrl: './info-product.component.html',
  styleUrl: './info-product.component.css'
})
export class InfoProductComponent {
  currentProduct = new Product();
  constructor(private productService : ProductService,
              private activatedRoute : ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(): void {
    const productId = this.activatedRoute.snapshot.params['id'];
    this.productService.editProduct(productId).subscribe(product => {
      this.currentProduct = product;
    });
  }
}
