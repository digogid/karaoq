import { v4 as uuid } from 'uuid';

class Mesa {
  id: string;
  numero: number;

  constructor(numero: number, id?: string) {
    this.id = id ?? uuid();
    this.numero = numero;
  }
}

export default Mesa;