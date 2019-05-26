export interface User {

  idUser: number;
  userName: string;
  password: string;
  email: string;
  name: string;
  surname: string;
  phone: number;
  birthDate: Date;
  street: string;
  number: number;
  portal: string;
  floor: number;
  door: string;
  userType: string;

  /*public constructor(init?: Partial<User >) {
    Object.assign(this, init);
  }*/
}
