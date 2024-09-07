import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ProductsService } from '../services/products.service';
import { CartService } from '../services/cart.service';
import { WishlistService } from '../services/wishlist.service';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [CurrencyPipe, CommonModule],
  standalone: true,
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _AuthenticationService: AuthenticationService,
    private _ProductsService: ProductsService,
    private _WishlistService: WishlistService,
    private _CartService: CartService
  ) {}

  subscription: any;
  imgDomain: string = '';
  product: any = {};
  id: string = '';
  fullStars: number = 0;
  halfStar: boolean = false;
  emptyStars: number = 5;

  ngOnInit(): void {
    // this._AuthenticationService.checkToken();
    this.id = this._ActivatedRoute.snapshot.params['id'];
    this.imgDomain = this._ProductsService.imgDomain;
    this.subscription = this._ProductsService
      .getOneProduct(this.id)
      .subscribe((res) => {
        this.product = res.data;
        const rating = this.product.ratingAverage;
        this.fullStars = Math.floor(rating);
        this.halfStar = rating % 1 >= 0.5;
        this.emptyStars = 5 - this.fullStars - (this.halfStar ? 1 : 0);
      });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  addProductToWishlist() {
    this._WishlistService
      .addProductToWishlist(this.id)
      .subscribe((res) => {});
  }
  addProdutToCart() {
    this._CartService.addProductToCart(this.id).subscribe((res) => {});
  }
}
