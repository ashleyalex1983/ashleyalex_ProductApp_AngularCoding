import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor( private http: HttpClient ) { }

  getProducts(){
    return this.http.get("http://localhost:3000/products");
  }

  newProduct(item){  
    return this.http.post("http://localhost:3000/insert",{"product":item})
      .subscribe(data =>{console.log(data);})
  }

  getProductDetails(id){
    return this.http.get(`http://localhost:3000/products/${id}`);
  }

  updateProduct(id, item){
    return this.http.put(`http://localhost:3000/products/${id}`, item);
  }

  deleteProduct(id){
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }
}
