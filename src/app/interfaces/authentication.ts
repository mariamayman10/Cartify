export interface Signup {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly confirmPassword: string;
}

export interface Signin {
  readonly email: string;
  readonly password: string;
}
