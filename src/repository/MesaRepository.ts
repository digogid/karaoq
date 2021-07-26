import Mesa from "../domain/Mesa";
import IRepository from "./IRepository";

import AWS from 'aws-sdk';

class MesaRepository implements IRepository<Mesa> {

  private DynamoClient: AWS.DynamoDB;
  private TableName: string;

  constructor() {
    this.DynamoClient = new AWS.DynamoDB();
    this.TableName = 'mesa';
  }
  
  public async List() {
    const params = {
      TableName: this.TableName
    };
    const result = await this.DynamoClient.scan(params).promise();
    const Cancoes = new Array<Mesa>();
    result.Items?.forEach((item) => {
      if (item) {
        Cancoes.push(new Mesa(parseInt(item.numero.N ?? "0"), item.id.S ));
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
      return new Mesa(parseInt(result.Item.numero.N ?? "0"), result.Item.id.S);
    }
    return null;
  }

  public async Upsert(item: Mesa) {
    const params : AWS.DynamoDB.PutItemInput = {
      TableName: this.TableName,
      Item: {
        id: { 'S': item.id },
        nome: { 'N': item.numero.toString() }
      }
    };
    await this.DynamoClient.putItem(params).promise();
    return item.id;
  }
}

export default new MesaRepository();