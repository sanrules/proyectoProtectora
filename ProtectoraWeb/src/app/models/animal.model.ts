export class Animal {
  public idAnimal: number;
  public name: string;
  public type: string;
  public breed: string;
  public gender: string;
  public birthDate: Date;
  public entranceDate: Date;
  public adoptionDate: Date;
  public status: string;
  public description: Date;
  public pictures: string;

  public constructor(init?: Partial<Animal>) {
    Object.assign(this, init);
  }
}