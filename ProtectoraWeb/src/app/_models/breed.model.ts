export class Breed {
    public id: number;
    public idtype: number;
    public name: string;

    public constructor(init?: Partial<Breed>) {
    Object.assign(this, init);
  }
}
