export interface LoginForm {
  email: string;
  password: string;
}

export interface LoginError {
  message?: string;
}

export interface CreateAccountField {
  fname: string;
  lname: string;
  email: string;
  password: string;
  birthOfDate: string;
  gender: string;
}
