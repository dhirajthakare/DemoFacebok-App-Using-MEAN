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


export interface User {
  _id:string;
  birthOfDate: string;
  createdAt: string;
  email: string;
  gender: string;
  name: string;
  password: string;
  profileUrl: string;
  updatedAt: string;
  userToken: string;
  user_info:UserInformation;
}

export interface UserInformation {
  _id:string;
  coverPhoto:string;
  createdAt:string;
  currentCity:string;
  highSchool:string;
  homeTown:string;
  relation:string;
  university:string;
  updatedAt:string;
  workplace:string;
}
