export interface JwtResponse {

  id: number;
  email: string;
  password?: string;
  type: string;
  token: string;

}