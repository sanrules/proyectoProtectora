export class Animal {
  public id: number;
  public name: string;
  public type: string;
  public breed: string;
  public gender: string;
  public size: string;
  public birth_date: Date;
  public entrance_date: Date;
  public adoption_date?: Date;
  public status: number;
  public description: string;
  public user_id?: number;

  public constructor(init?: Partial<Animal>) {
    Object.assign(this, init);
  }
}
