import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../services/wishlist.service';
import { CurrencyPipe } from '@angular/common';
import { DescriptionPipe } from '../pipes/description.pipe';
import { ProductsService } from '../services/products.service';
import { CartService } from '../services/cart.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CurrencyPipe, DescriptionPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent implements OnInit {
  constructor(
    private _AuthenticationService: AuthenticationService,
    private _WishlistService: WishlistService,
    private _ProductsService: ProductsService,
    private _CartService: CartService,
    private _Router: Router
  ) {}

  subscription: any;
  imgDomain: string = '';
  wishlist: any[] = [];

  loadWishlist() {
    this.subscription = this._WishlistService.getWishlist().subscribe((res) => {
      this.wishlist = res.data.wishlist;
    });
  }

  ngOnInit(): void {
    this._AuthenticationService.checkToken();
    this.imgDomain = this._ProductsService.imgDomain;
    this.loadWishlist();
  }

  addProductToCart(product: string) {
    this._CartService.addProductToCart(product).subscribe((res) => {});
  }
  removeProductFromWishlist = (product: any) => {
    this._WishlistService
      .removeProductFromWishlist(product)
      .subscribe((res) => {
        this.wishlist = res.data.wishlist;
      });
    this.loadWishlist();
  };
  viewProductDetails(productId: string) {
    this._Router.navigate([`/products/${productId}`]);
  }
}
