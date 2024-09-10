import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  subscription: any;
  infoError: string = '';
  currentPasswordError: string = '';
  passwordError: string = '';
  user: any = {};
  userImage: string = '';
  name: string = '';
  imageFile: any;

  getName(name: string) {
    this.name = name;
  }
  getFile(event: any) {
    const image = event.target.files[0];
    if (image) {
      this.imageFile = image;
    }
  }

  passwordForm = new FormGroup({
    currentPassword: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]),
    confirmPassword: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]),
  });

  constructor(
    private _AuthenticationService: AuthenticationService,
    private _UserService: UserService,
    private _SnackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this._AuthenticationService.checkToken();
    this.userImage = this._UserService.userImg;
    this.loadUser();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadUser() {
    this.subscription = this._UserService.getUser().subscribe({
      next: (res) => {
        this.user = res.data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  updateUser() {
    const formData = new FormData();
    formData.append('name', this.name);
    if (this.imageFile) {
      formData.append('image', this.imageFile);
    }
    console.log(this.name, this.imageFile);
    this._UserService.updateUser(formData).subscribe({
      next: (res) => {
        this.loadUser();
        this._SnackbarService.showSnackbar('User updated successfully')
      },
    });
  }

  changeUserPassword(formData: FormGroup) {
    this._UserService.changePassword(formData.value).subscribe({
      next: (res) => {
        localStorage.setItem('user', res.token);
        this._AuthenticationService.saveCurrentUser();
        alert('password changed');
      },
      error: (err) => {
        err.error.errors.map((error: any) => {
          if (error.path === 'currentPassword') {
            this.currentPasswordError = error.msg;
          } else if (error.path === 'password') {
            this.passwordError = error.msg;
          }
        });
      },
    });
  }
}
