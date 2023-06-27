export interface LoginForm {
  email: string;
  password: string;
}

export interface LoginError {
  message?: string;
}

export interface CreateAccoundField {
  fname: string;
  lname: string;
  email: string;
  password: string;
  birthOfDate: string;
  gender: string;
}
