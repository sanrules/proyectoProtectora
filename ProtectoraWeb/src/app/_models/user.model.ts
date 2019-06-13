export interface User {

  id: number;
  username: string;
  password: string;
  email: string;
  name: string;
  surname: string;
  dni: string;
  phone: number;
  birth_date: Date;
  street: string;
  number: number;
  portal: string;
  floor: number;
  door: string;
  province: string;
  city: string;
  postal_code: number;
  avatar: string;
  user_type: string;

  /*public constructor(init?: Partial<User >) {
    Object.assign(this, init);
  }*/
}
