import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  constructor() {}
  hostName: string = 'http://localhost:3001';
  authenticationRoute: string = '/api/v1/auth';
  productsRoute: string = '/api/v1/products';
  cartRoute: string = '/api/v1/cart';
  wishlistRoute: string = '/api/v1/wishlist';
  reviewsRoute: string = '/api/v1/review';
  productImg: string = `${this.hostName}/products/`;
}
