import { Routes } from '@angular/router';
import { HomeComponent } from './homepage/home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { authenticationGuard } from './guards/authentication.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'products',
    loadComponent: () =>
      import('./products/products.component').then((m) => m.ProductsComponent),
  },
  {
    path: 'products/:id',
    loadComponent: () =>
      import('./product-details/product-details.component').then(
        (m) => m.ProductDetailsComponent
      ),
  },
  {
    path: 'cart',
    canActivate: [authenticationGuard],
    loadComponent: () =>
      import('./cart/cart.component').then((m) => m.CartComponent),
  },
  {
    path: 'wishlist',
    canActivate: [authenticationGuard],
    loadComponent: () =>
      import('./wishlist/wishlist.component').then((m) => m.WishlistComponent),
  },
  {
    path: 'myReviews',
    canActivate: [authenticationGuard],
    loadComponent: () =>
      import('./reviews/reviews.component').then((m) => m.ReviewsComponent),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./signup/signup.component').then((m) => m.SignupComponent),
  },
  {
    path: 'signin',
    loadComponent: () =>
      import('./signin/signin.component').then((m) => m.SigninComponent),
  },
  {
    path: 'forgetPassword',
    loadComponent: () =>
      import('./forget-password/forget-password.component').then(
        (m) => m.ForgetPasswordComponent
      ),
  },
  { path: '**', component: NotFoundComponent },
];
