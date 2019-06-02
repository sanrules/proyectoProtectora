export class News {
    public id: number;
    public name: string;
    public content: string;
    public publicationDate: Date;
    public constructor(init?: Partial<News>) {
    Object.assign(this, init);
  }
}