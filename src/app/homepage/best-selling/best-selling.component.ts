import {
  Component,
  OnDestroy,
  OnInit,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { DescriptionPipe } from '../../pipes/description.pipe';
import { Router, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ProductsService } from '../../services/products.service';
import { AuthenticationService } from '../../services/authentication.service';
import { register } from 'swiper/element/bundle';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
register();

@Component({
  selector: 'app-best-selling',
  standalone: true,
  imports: [DescriptionPipe, RouterLink, CurrencyPipe],
  templateUrl: './best-selling.component.html',
  styleUrl: './best-selling.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BestSellingComponent implements OnInit, OnDestroy {
  subscription: any;
  imgDomain: string = '';
  search: string = '';
  products: any[] = [];
  swiperEl: any;

  getNext = () => {
    this.swiperEl.swiper.slideNext();
  };
  getPrev = () => {
    this.swiperEl.swiper.slidePrev();
  };

  constructor(
    private _ProductsService: ProductsService,
    private _CartService: CartService,
    private _WishlistService: WishlistService,
    // private _AuthenticationService: AuthenticationService,
    private _Router: Router
  ) {}

  ngOnInit(): void {
    // this._AuthenticationService.checkToken();
    this.imgDomain = this._ProductsService.imgDomain;
    this.subscription = this._ProductsService
      .getProducts(16, 1, '-sold', this.search)
      .subscribe((res) => {
        this.products = res.data;
      });
    this.swiperEl = document.querySelector(
      '#bestselling-swiper-container'
    ) as any;
    this.swiperEl.initialize();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  addProductToCart(product: string) {
    this._CartService.addProductToCart(product).subscribe((res) => {});
  }
  addProductToWishlist(product: string) {
    this._WishlistService.addProductToWishlist(product).subscribe((res) => {});
  }
  viewProductDetails(productId: string) {
    this._Router.navigate([`/products/${productId}`]);
  }
}
