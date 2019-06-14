export class Breed {
    public id: number;
    public idType: number;
    public name: string;

    public constructor(init?: Partial<Breed>) {
    Object.assign(this, init);
  }
}
