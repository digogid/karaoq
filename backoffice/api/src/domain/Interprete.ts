import { v4 as uuid } from 'uuid';

class Interprete {
  nome: string;
  nacional?: boolean

  constructor(nome: string, nacional?: boolean) {
    this.nome = nome;
    this.nacional = nacional;
  }
}

export default Interprete;