import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private hostName: string = 'http://localhost:3001';
  private routeName: string = '/api/v1/cart';
  constructor(private _HttpClient: HttpClient) {}

  addProductToCart = (product: string): Observable<any> => {
    return this._HttpClient.post(
      `${this.hostName}${this.routeName}`,
      { product: product },
      { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } }
    );
  };

  removeProductFromCart = (product: string): Observable<any> => {
    return this._HttpClient.delete(
      `${this.hostName}${this.routeName}/${product}`,
      { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } }
    );
  };

  updateProductQuantity = (
    product: string,
    quantity: number
  ): Observable<any> => {
    return this._HttpClient.put(
      `${this.hostName}${this.routeName}/${product}`,
      { quantity: quantity },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
  };

  clearCart = (): Observable<any> => {
    return this._HttpClient.delete(
      `${this.hostName}${this.routeName}`,
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
  };
  getCart = (): Observable<any> => {
    return this._HttpClient.get(`${this.hostName}${this.routeName}`, {
      headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
    });
  };
}
