import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Category} from "./category";
import {Product} from "../product/product";

const httpOptions = {
  headers : new HttpHeaders({
    'content-Type' : 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  apiURL : string = "http://localhost:8080/api";
  categories! : Category[];
  category! : Category;
  constructor(private http : HttpClient) {

  }

  categoriesList(searchkeyword: String = ""){
    const params = searchkeyword ? `?searchKey=${searchkeyword}` : '';
    return this.http.get<Category[]>(`${this.apiURL}/categories${params}`, httpOptions);
  }

  addCategory(category: Category){
    return this.http.post<Category>(this.apiURL+"/categories/save", category, httpOptions);
  }

  deleteCategory(id : number){
    return this.http.delete(this.apiURL+"/categories/delete/"+id);
  }

  editCategory(id : number){
    return this.http.get<Category>(this.apiURL+"/categories/"+id);
  }

  updateCategory(category : Category){
    return this.http.put<Category>(this.apiURL+"/categories/update", category, httpOptions);
  }
}

