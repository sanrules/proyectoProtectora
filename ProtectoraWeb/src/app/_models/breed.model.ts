export class Breed {
    public id: number;
    public idtipo: number;
    public nombre: string;

    public constructor(init?: Partial<Breed>) {
    Object.assign(this, init);
  }
}
