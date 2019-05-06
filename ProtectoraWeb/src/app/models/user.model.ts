export class User {

  public userName: string;
  public password:string;
  public email: string;
  public name: string;
  public surname: string;
  public phone: number;
  public birthDate: Date;
  public street: string;
  public number: number;
  public portal: string;
  public floor: number;
  public door: string;
  public userType:string;

  public constructor(init?: Partial<User >) {
    Object.assign(this, init);
  }
}