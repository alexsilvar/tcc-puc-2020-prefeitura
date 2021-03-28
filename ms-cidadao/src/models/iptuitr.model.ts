import {Entity, model, property} from '@loopback/repository';

@model()
export class Iptuitr extends Entity {
  @property({
    type: 'string',
    id: true,
    defaultFn: "uuid"
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  cpfcnpj: string;

  @property({
    type: 'string',
    required: true,
  })
  numregistro: string;

  @property({
    type: 'number',
    required: true,
  })
  valor: number;

  @property({
    type: 'string',
  })
  comentarios?: string;


  constructor(data?: Partial<Iptuitr>) {
    super(data);
  }
}

export interface IptuitrRelations {
  // describe navigational properties here
}

export type IptuitrWithRelations = Iptuitr & IptuitrRelations;
