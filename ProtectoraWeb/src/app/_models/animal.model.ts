export class Animal {
  public idAnimal: number;
  public name: string;
  public type: string;
  public breed: string;
  public gender: string;
  public size: string;
  public birthDate: Date;
  public entranceDate: Date;
  public adoptionDate: Date;
  public status: number;
  public description: Date;
  public pictures: any;
  public idUser?: number;

  public constructor(init?: Partial<Animal>) {
    Object.assign(this, init);
  }
}
