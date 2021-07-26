import { Request, Response, Router } from "express";
import IController from "./IController";
import MesaRepository from "../repository/MesaRepository";
import MesaViewModel from "../viewmodel/MesaViewModel";

class MesaController implements IController {
  public router = Router();

  private Repository: typeof MesaRepository;

  constructor() {
    this.initRoutes();
    this.Repository = MesaRepository;
  }

  public initRoutes() {
    this.router.get("/mesas/:id?", this.get);
    this.router.post("/mesas", this.upsert);
  }

  private get = async (req: Request, res: Response) => {
    try {
      if (req.params?.id) {
        const mesa = await this.Repository.Find(req.params?.id);
        if (mesa) {
          return res.send(MesaViewModel.FromDomain(mesa)).status(200);
        }
      }
      else {
        const list = await this.Repository.List();
        if (list.length > 0) 
          return res.send(MesaViewModel.FromDomains(list)).status(200);
      }
      
      return res.status(204).send();
    } catch (error) {
      console.error(`Mesa.get`, error);
      res.status(500).send(error.message);
    }
  };

  private upsert = async (req: Request, res: Response) => {
    try {
      const { body } = req;

      const errors = this.validateRequest(body);

      if (errors.length > 0)
        return res.status(400).send(errors.join('\n'));

      const mesa = new MesaViewModel(
        body.numero,
        body.id,
      );
      
      const id = await this.Repository.Upsert(mesa.ToDomain());
      if (id)
        return res.status(201).send(id);
      
      return res.status(204).send('Nenhuma mesa inserida na base');
    } catch (error) {
      console.error('Mesa.post', error);
      res.status(500).send(error.message);
    }
  };

  private validateRequest(body : any) : Array<string> {
    const errors = new Array<string>();

    if (!body.numero)
      errors.push('Número da mesa é obrigatório');

    return errors;
  }
}

export default new MesaController();