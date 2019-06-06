export interface Comment {

  id: number;
  animalId: number;
  userId: number;
  date: Date;
  text: string;

  /*public constructor(init?: Partial<Comment >) {
    Object.assign(this, init);
  }*/
}