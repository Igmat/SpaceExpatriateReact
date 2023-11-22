export class Serializer<T> {
  constructor(
    private readonly prefix: string,
    private readonly object: T,
    private readonly keys: (keyof T)[] = []

  ) {}

  serialize(data:any): void {
    data[this.prefix] =  this.keys.reduce((acc, key) => {
      acc[key] = this.object[key];
      return acc;
    }, {} as any);
  }

  deserialize(data: any ): void {
    this.keys.forEach((key) => {
      this.object[key] = data[this.prefix][key];
    });
  }
}
