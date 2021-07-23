
interface IRepository<T> {

  List(): Promise<Array<T>>;
  Find(id: string): Promise<T | null>;
  Upsert(object: T): Promise<string>;
}

export default IRepository