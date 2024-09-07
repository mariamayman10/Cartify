import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private hostName: string = 'http://localhost:3001';
  private routeName: string = '/api/v1/wishlist';
  constructor(private _HttpClient: HttpClient) {}

  addProductToWishlist = (product: string): Observable<any> => {
    return this._HttpClient.post(
      `${this.hostName}${this.routeName}`,
      { product: product },
      { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } }
    );
  };
  removeProductFromWishlist = (product: string): Observable<any> => {
    return this._HttpClient.delete(
      `${this.hostName}${this.routeName}/${product}`,
      { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } }
    );
  };
  getWishlist = (): Observable<any> => {
    return this._HttpClient.get(`${this.hostName}${this.routeName}`, {
      headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
    });
  };
}
