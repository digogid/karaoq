import Mesa from "../domain/Mesa";

class MesaViewModel {
  id?: string;
  numero: number;

  constructor(numero: number, id?: string) {
    this.id = id ? id : undefined;
    this.numero = numero;
  }

  public ToDomain() : Mesa {
    return new Mesa(this.numero, this.id);
  }
  
  public static FromDomain(domain: Mesa) : MesaViewModel {
    return new MesaViewModel(domain.numero, domain.id);
  }

  public static FromDomains(domain : Array<Mesa>) : Array<MesaViewModel> {
    const list = new Array<MesaViewModel>();

      domain.forEach((item) => {
        list.push(this.FromDomain(item));
      });

      return list;
  }
}

export default MesaViewModel;