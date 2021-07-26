import Cancao from "../domain/Cancao";
import Interprete from "../domain/Interprete";
import IRepository from "./IRepository";

import AWS from 'aws-sdk';

class CancaoRepository implements IRepository<Cancao> {

  private DynamoClient: AWS.DynamoDB;
  private TableName: string;

  constructor() {
    this.DynamoClient = new AWS.DynamoDB();
    this.TableName = 'cancao';
  }
  
  public async List() {
    const params = {
      TableName: this.TableName
    };
    const result = await this.DynamoClient.scan(params).promise();
    const Cancoes = new Array<Cancao>();
    result.Items?.forEach((item) => {
      if (item) {
        const interprete = new Interprete(item.interprete.M?.nome.S ?? "", item.interprete.M?.nacional.BOOL);
        Cancoes.push(new Cancao(item.nome.S ?? "", interprete, item.album.S ?? "", item.id.S ));
      }
    });
    return Cancoes;
  }
  
  public async Find(id: string) {
    const params = {
      TableName: this.TableName,
      Key: {
        "id": {
          "S": id
        }
      }
    };

    const result = await this.DynamoClient.getItem(params).promise();
    if (result.Item) {
      const interprete = new Interprete(result.Item.interprete.M?.nome.S ?? "", result.Item.interprete.M?.nacional.BOOL);
      return new Cancao(result.Item.nome.S ?? "", interprete, result.Item.album.S ?? "", result.Item.id.S );
    }
    return null;
  }

  public async Upsert(item: Cancao) {
    const params : AWS.DynamoDB.PutItemInput = {
      TableName: this.TableName,
      Item: {
        id: { 'S': item.id },
        nome: { 'S': item.nome },
        album: { 'S': item.album },
        interprete: { 'M': 
          { 
            nome: { 'S' : item.interprete.nome } ,
            nacional: { 'BOOL': item.interprete.nacional }
          }
        }
      }
    };
    await this.DynamoClient.putItem(params).promise();
    return item.id;
  }
}

export default new CancaoRepository();