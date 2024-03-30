import {Category} from "../category/category";

export class Product {
  id?  : number;
  name? : string;
  price? : number;
  amount? : number;
  dateCreate? : Date;
  description? : string;
  category? : Category;
  qrCode?: string;
}
