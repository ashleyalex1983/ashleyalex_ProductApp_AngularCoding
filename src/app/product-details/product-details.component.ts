import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { ProductModel } from '../product-list/product.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  id: String ='';

  currentProduct = null;
  message = '';
  constructor(
              private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router
             ) { }

  ngOnInit(): void {
    this.message = '';
    this.id=this.route.snapshot.params.id;
    this.getProduct(this.id);
  }

  getProduct(id){
    console.log(id);
    this.productService.getProductDetails(id)
      .subscribe((product)=>{
        this.currentProduct = product;
        console.log(product);
      },(error)=>{
        console.log(error);
      });
  }

  updateProductDetails(){
    this.productService.updateProduct(this.currentProduct._id, this.currentProduct)
      .subscribe((response)=>{
        console.log(response);
        // this.message = 'Product Updated';
        alert("Product Updated Successfully");
        this.router.navigate(['/']);
      },(error)=>{
        console.log(error);
      });
  }

  // deleteProductData(){
  //   this.productService.deleteProduct(this.currentProduct.id)
  //     .subscribe((response)=>{
  //       console.log(response);
  //       this.router.navigate(['/']);
  //     },(error)=>{
  //       console.log(error);
  //     });
  // }

}
