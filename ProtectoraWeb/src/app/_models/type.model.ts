export class Type {
        public id: number;
        public nombre: string;

        public constructor(init?: Partial<Type>) {
        Object.assign(this, init);
      }
}
