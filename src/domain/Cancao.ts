import { v4 as uuid } from 'uuid';
import Interprete from './Interprete';

class Cancao {
  id: string;
  nome: string;
  album?: string;
  interprete: Interprete;

  constructor(nome: string, interprete: Interprete, album?: string, id? : string) {
    this.id = id ?? uuid();
    this.nome = nome;
    this.interprete = interprete;
    this.album = album;
  }
}

export default Cancao;