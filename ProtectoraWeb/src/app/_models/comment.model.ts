export interface Comment {

  id: number;
  animal_id: number;
  user_id: number;
  date: Date;
  text: string;
  username?: string;
  avatar?: string;

  /*public constructor(init?: Partial<Comment >) {
    Object.assign(this, init);
  }*/
}