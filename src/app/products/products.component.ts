import { Component } from '@angular/core';
import { Pagination } from '../interfaces/pagination';
import { AuthenticationService } from '../services/authentication.service';
import { ProductsService } from '../services/products.service';
import { CartService } from '../services/cart.service';
import { WishlistService } from '../services/wishlist.service';
import { CurrencyPipe } from '@angular/common';
import { DescriptionPipe } from '../pipes/description.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CurrencyPipe, DescriptionPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  constructor(
    private _AuthService: AuthenticationService,
    private _ProductsService: ProductsService,
    private _CartService: CartService,
    private _WishlistService: WishlistService,
    private _Router: Router
  ) {}

  subscription: any;
  imgDomain: string = '';
  products: any[] = [];
  pagination: Pagination = {};
  search: string = '';
  page: number = 1;

  ngOnInit(): void {
    this._AuthService.checkToken();
    this.loadProducts();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadProducts() {
    this.imgDomain = this._ProductsService.imgDomain;
    this.subscription = this._ProductsService
      .getProducts(16, this.page, undefined, this.search)
      .subscribe((res) => {
        this.products = res.data;
        this.pagination = res.pagination;
        console.log(res);
      });
  }

  addProductToWishlist(product: string) {
    this._WishlistService.addProductToWishlist(product).subscribe((res) => {});
  }
  addProductToCart(product: string) {
    this._CartService.addProductToCart(product).subscribe((res) => {});
  }
  viewProductDetails(product: string) {
    this._Router.navigate([`/products/${product}`]);
  }

  changePage(page: number) {
    this.page = page;
    this.loadProducts();
  }
}
