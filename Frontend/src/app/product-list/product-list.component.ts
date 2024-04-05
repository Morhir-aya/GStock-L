import {Component, OnInit} from '@angular/core';
import {Product} from "../services/product/product";
import {ProductService} from "../services/product/product.service";
import { ExcelService } from '../services/excel/excel.service';
import {AuthService} from "../services/Auth/auth.service";
import {HttpHeaders} from "@angular/common/http";


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{
  products!: Product[];
  qrCodes! : string[];
  MyAngularQrCode : any;
  product : Product = new Product();
  lowQuantityProducts: Product[] = [];
  constructor(private productService : ProductService, private excelService: ExcelService, private authService : AuthService) {
    productService.productsList().subscribe(p=>{
      console.log(p);
      this.products = p;
      // Generate QR code for each product
      this.products.forEach(product => {
        const qrData = this.generateQRCodeData(product);
        product.qrCode = qrData;
      });
    })
  }

  ngOnInit(): void {
    this.loadLowQuantityProducts();
  }

  // Generate QR code data for a product
  generateQRCodeData(product: Product): string {
    // Generate QR code data using product information
    const qrData = `Product Name: ${product.name}\nPrice: ${product.price}\nDescription: ${product.description}\nAmount: ${product.amount}\nCreation date: ${product.dateCreate}\nCategory: ${product.category?.category}`;
    return qrData;
  }


  deleteProduct(product : Product){
    let message = confirm("Are you sure you want to delete this product?");
    if (message)
      this.productService.deleteProduct(product.id!).subscribe(()=>{
        this.loadProducts();
      });
  }

  loadProducts(){
    this.productService.productsList().subscribe(p =>{
      this.products = p;

      this.products.forEach(product => {
        const qrData = this.generateQRCodeData(product);
        product.qrCode = qrData;
      });
    })
  }
  loadProd(searchKey : String){
    this.productService.productsList(searchKey).subscribe(p =>{
      this.products = p;
      this.products.forEach(product => {
        const qrData = this.generateQRCodeData(product);
        product.qrCode = qrData;
      });
    })
  }

  searchByKeyword(searchkeyword : String){
    console.log(searchkeyword);
    this.products = [];
    this.loadProd(searchkeyword)

}

  exportToExcel(): void {
    this.excelService.exportToExcel(this.products, 'product_list');
  }

  incrementAmount(product: Product): void {
    this.productService.incrementProductAmount(product.id!).subscribe(updatedProduct => {
      product.amount = updatedProduct.amount;
      window.location.reload();
    });
  }

  decrementAmount(product: Product): void {
    this.productService.decrementProductAmount(product.id!).subscribe(updatedProduct => {
      product.amount = updatedProduct.amount;
      window.location.reload();
    });
  }

  loadLowQuantityProducts(): void {
    this.productService.getLowQuantityProducts().subscribe(products => {
      this.lowQuantityProducts = products;
    });
  }


}

