import Cancao from "../domain/Cancao";
import Interprete from "../domain/Interprete";

class CancaoViewModel {
  id?: string;
  nome: string;
  album?: string;
  interprete: string;
  nacional: boolean;

  constructor(nome: string, interprete: string, nacional?: boolean, id?: string, album?: string) {
    this.id = id ? id : undefined;
    this.nome = nome;
    this.album = album;
    this.interprete = interprete;
    this.nacional = nacional ?? true;
  }

  public ToDomain() : Cancao {
    return new Cancao(this.nome, new Interprete(this.interprete, this.nacional), this.album, this.id);
  }
  
  public static FromDomain(domain: Cancao) : CancaoViewModel {
    return new CancaoViewModel(domain.nome, domain.interprete.nome, domain.interprete.nacional, domain.id, domain.album);
  }

  public static FromDomains(domain : Array<Cancao>) : Array<CancaoViewModel> {
    const list = new Array<CancaoViewModel>();

      domain.forEach((item) => {
        list.push(this.FromDomain(item));
      });

      return list;
  }
}

export default CancaoViewModel;