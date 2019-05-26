export class Type {
        public id: number;
        public name: string;

        public constructor(init?: Partial<Type>) {
        Object.assign(this, init);
      }
}
