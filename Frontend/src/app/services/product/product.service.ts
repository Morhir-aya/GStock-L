import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Product} from "./product";
import {Category} from "../category/category";
import {Observable} from "rxjs";

const httpOptions = {
  headers : new HttpHeaders({
    'content-Type' : 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class ProductService  {
  apiURL : string = "http://localhost:8080/api";
  products! : Product[];
  product! : Product;
  categories! : Category[];
  category! : Category;
  constructor(private http : HttpClient) {
    this.products = [];
    this.categories = [];
  }
  productsList(searchkeyword: String = ""){
    const params = searchkeyword ? `?searchKey=${searchkeyword}` : '';
    return this.http.get<Product[]>(`${this.apiURL}/products${params}`, httpOptions);
  }

  categoriesList(){
    return this.http.get<Category[]>(this.apiURL+"/categories", httpOptions);
  }

  addProduct(product: Product){
    return this.http.post<Product>(this.apiURL+"/products/save", product, httpOptions);
  }

  deleteProduct(id : number){
    return this.http.delete(this.apiURL+"/products/delete/"+id);
  }

  editProduct(id : number){
    return this.http.get<Product>(this.apiURL+"/products/"+id);
  }

  updateProduct(product : Product){
    return this.http.put<Product>(this.apiURL+"/products/update", product, httpOptions);
  }

  incrementProductAmount(productId: number): Observable<Product> {
    return this.http.put<Product>(`${this.apiURL}/products/increment/${productId}`, {}, httpOptions);
  }

  decrementProductAmount(productId: number): Observable<Product> {
    return this.http.put<Product>(`${this.apiURL}/products/decrement/${productId}`, {}, httpOptions);
  }

  getLowQuantityProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiURL+'/products/low-quantity');
  }


}
