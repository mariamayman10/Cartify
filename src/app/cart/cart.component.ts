import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { CartService } from '../services/cart.service';
import { AuthenticationService } from '../services/authentication.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  subscription: any;
  imgDomain: string = '';
  cartItems: any[] = [];
  cart: any;

  constructor(
    private _ProductsService: ProductsService,
    private _CartService: CartService,
    private _AuthenticationService: AuthenticationService
  ) {}

  loadCart() {
    this.subscription = this._CartService.getCart().subscribe((res) => {
      this.cart = res.data;
      this.cartItems = res.data.cartItems;
    });
  }

  ngOnInit(): void {
    this._AuthenticationService.checkToken();
    this.imgDomain = this._ProductsService.imgDomain;
    this.loadCart();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  increaseQuantity = (product: any, currentQ: number) => {
    this._CartService
      .updateProductQuantity(product, ++currentQ)
      .subscribe((res) => {
        this.cart = res.data;
        this.cartItems = res.data.cartItems;
      });
  };
  decreaseQuantity = (product: any, currentQ: number) => {
    if (currentQ == 1) this.removeProductFromCart(product);
    else
      this._CartService
        .updateProductQuantity(product, --currentQ)
        .subscribe((res) => {
          this.cart = res.data;
          this.cartItems = res.data.cartItems;
        });
  };
  removeProductFromCart = (product: any) => {
    this._CartService.removeProductFromCart(product).subscribe((res) => {
      this.cart = res.data;
      this.cartItems = res.data.cartItems;
    });
  };
  clearCart = () => {
    this._CartService.clearCart().subscribe((res) => {
      this.cart = null;
      this.cartItems = [];
    });
  };
}
