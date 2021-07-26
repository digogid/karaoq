import { Request, Response, Router } from "express";
import IController from "./IController";
import CancaoRepository from "../repository/CancaoRepository";
import CancaoViewModel from "../viewmodel/CancaoViewModel";

class CancaoController implements IController {
  public router = Router();

  private Repository: typeof CancaoRepository;

  constructor() {
    this.initRoutes();
    this.Repository = CancaoRepository;
  }

  public initRoutes() {
    this.router.get("/cancoes/:id?", this.get);
    this.router.post("/cancoes", this.upsert);
  }

  private get = async (req: Request, res: Response) => {
    try {
      if (req.params?.id) {
        const cancao = await this.Repository.Find(req.params?.id);
        if (cancao) {
          return res.send(CancaoViewModel.FromDomain(cancao)).status(200);
        }
      }
      else {
        const list = await this.Repository.List();
        if (list.length > 0) 
          return res.send(CancaoViewModel.FromDomains(list)).status(200);
      }
      
      return res.status(204).send();
    } catch (error) {
      console.error(`Cancao.get`, error);
      res.status(500).send(error.message);
    }
  };

  private upsert = async (req: Request, res: Response) => {
    try {
      const { body } = req;

      const errors = this.validateRequest(body);

      if (errors.length > 0)
        return res.status(400).send(errors.join('\n'));

      const cancao = new CancaoViewModel(
        body.nome,
        body.interprete,
        body.nacional,
        body.id,
        body.album
      );
      
      const id = await this.Repository.Upsert(cancao.ToDomain());
      if (id)
        return res.status(201).send(id);
      
      return res.status(204).send('Nenhuma canção inserida na base');
    } catch (error) {
      console.error('Cancao.post', error);
      res.status(500).send(error.message);
    }
  };

  private validateRequest(body : any) : Array<string> {
    const errors = new Array<string>();

    if (!body.nome)
      errors.push('Nome da canção é obrigatório');

    if (!body.interprete)
      errors.push('Nome do intérprete é obrigatório');

    return errors;
  }
}

export default new CancaoController();