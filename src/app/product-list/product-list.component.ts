import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModel } from './product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  title:String = "Product List";

  //Product is the model class for a product item
  products : ProductModel[];
  //image properties
  imageWidth: number = 50;
  imageMargin: number = 2;

  showImage: boolean =false;

  // currentProduct ?:ProductModel;
  // currentIndex = -1;


  //creating service object for calling getProducts()
  constructor(private productService: ProductService,
              private router: Router) { }

  toggleImage():void{
    this.showImage =!this.showImage;
  }

  ngOnInit(): void {

    this.getProductList();

  }

  getProductList(){
    //calling getProducts() and loading to products[]
    this.productService.getProducts()
      .subscribe((productdata)=>{
        this.products = JSON.parse(JSON.stringify(productdata));
    })
  }

  // refresh(){
  //   this.getProductList();
  //   this.currentProduct =undefined;
  //   this.currentIndex = -1;
  // }

  // setCurrentProduct(product: ProductModel, index: number){
  //   this.currentProduct = product;
  //   this.currentIndex = index;
  // }

  onDelete(product:ProductModel){
    if(confirm('Are you sure to delete this product record ?') == true)
    {
      this.productService.deleteProduct(product._id)
        .subscribe((response)=>{
            //console.log(response);
          alert("Deleted Successfully");
          this.getProductList();
        // this.router.navigate(['/']);
      });
    }

    
  }

}
